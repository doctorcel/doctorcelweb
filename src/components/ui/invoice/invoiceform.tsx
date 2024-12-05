import { useEffect, useState } from "react";
import { useInvoiceStore } from "@/stores/useStore";
import { generatePDF } from "@/utils/pdfGenerator";

type Client = {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  taxId?: string;
};

type Article = {
  id: number;
  name: string;
  price: number;
};

type InvoiceItem = {
  articleId: number;
  name: string;
  quantity: number;
  price: number;
  discount: number; // Ahora es obligatorio
  subtotal: number;
};

interface Warehouse {
  id: number;
  name: string;
  description: string | null;
  articles: Article[];
}


const InvoiceForm = () => {
  const { setClient, addItem, removeItem, items, client } = useInvoiceStore();
  const [clients, setClients] = useState<Client[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [discount, setDiscount] = useState<number>(0); // Estado para el descuento
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );
  const [searchClient, setSearchClient] = useState<string>("");
  const [searchArticle, setSearchArticle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para el loader
  const [notes, setNotes] = useState<string>(""); // Notas adicionales

  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await fetch("/api/client");
        if (!clientsResponse.ok) {
          throw new Error("Error al obtener los clientes");
        }
        const clientsData: Client[] = await clientsResponse.json();
        setClients(clientsData);

        const articlesResponse = await fetch("/api/articles");
        if (!articlesResponse.ok) {
          throw new Error("Error al obtener los artículos");
        }
        const articlesData: Article[] = await articlesResponse.json();
        setArticles(articlesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }
        const response = await fetch("/api/warehouses", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las bodegas");
        }
        const data: Warehouse[] = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWarehouses();
  }, []);

  const handleAddItem = () => {
    if (!selectedArticle) return;

    const calculatedSubtotal =
      quantity * selectedArticle.price - (discount || 0);

    // Validar que el subtotal no sea negativo
    if (calculatedSubtotal < 0) {
      alert("El descuento no puede exceder el total del artículo.");
      return;
    }

    const newItem: InvoiceItem = {
      articleId: selectedArticle.id,
      name: selectedArticle.name,
      quantity,
      price: selectedArticle.price,
      discount: discount > 0 ? discount : 0, // Siempre es un número
      subtotal: calculatedSubtotal,
    };
    addItem(newItem);

    // Resetear campos después de agregar
    setSelectedArticle(null);
    setSearchArticle("");
    setQuantity(1);
    setDiscount(0);
  };

  const handleRemoveItem = (articleId: number) => {
    removeItem(articleId);
  };

  const totalAmount = items.reduce((total, item) => total + item.subtotal, 0);


  const handleGenerateInvoice = async () => {
    if (!client || !selectedWarehouse || items.length === 0) {
      alert("Debes seleccionar un cliente, un almacén y agregar al menos un artículo.");
      return;
    }

    setIsLoading(true);

    const invoiceData = {
      clientId: client.id,
      companyInfoId: 1,
      clientName: client.name,
      clientAddress: client.address || "",
      clientPhone: client.phone || "",
      clientEmail: client.email || "",
      clientTaxId: client.document || "",
      warehouseId: selectedWarehouse.id,
      items: items.map((item) => ({
        articleId: item.articleId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        discount: item.discount,
      })),
      total: totalAmount,
      notes: notes,
    };

    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        const responseData = await response.json();

        const companyInfo = {
          name: "Doctor Cel",
          address: "Calle 52 sur 70-10",
          phone: "3004001077",
          email: "doctorcel@gmail.com",
          taxId: "1017175353-9",
        };

        const pdfBytes = await generatePDF(responseData, companyInfo);
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Factura_${responseData.number}.pdf`;
        link.click();

        resetForm();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}\nDetalles: ${errorData.details.join(", ")}`);
      }
    } catch (error) {
      console.error("Error al generar la factura:", error);
      alert("Ocurrió un error al generar la factura. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setClient(null);
    setSelectedWarehouse(null);
    setItems([]);
    setNotes("");
  };

  const setItems = (newItems: InvoiceItem[]) => {
    // Si estás utilizando un store, ajusta esta función según tu implementación
    // Aquí asumimos que tienes un método para resetear los items
    items.length = 0;
  };

  const handleClientSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchClient(query);
    if (query === "") {
      setFilteredClients([]);
    } else {
      setFilteredClients(
        clients.filter((client) => client.name.toLowerCase().includes(query))
      );
    }
  };

  const handleArticleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchArticle(query);
    if (query === "") {
      setFilteredArticles([]);
    } else {
      setFilteredArticles(
        articles.filter((article) => article.name.toLowerCase().includes(query))
      );
    }
  };

  const handleSelectClient = (selectedClient: Client) => {
    setClient(selectedClient);
    setFilteredClients([]); // Limpiar la lista después de seleccionar
  };

  const handleSelectArticle = (selectedArt: Article) => {
    setSelectedArticle(selectedArt);
    // No limpiamos la lista para mantener la selección visible
  };

  return (
    <div className="p-2 w-full mx-auto bg-gray-300 rounded-lg shadow-md text-gray-900 dark:bg-gray-900 dark:text-gray-200 flex flex-col lg:flex-row">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-xl">
            Generando factura, por favor espera...
          </div>
        </div>
      )}
      <div className="w-full px-4 py-4 lg:w-8/12 lg:px-4">
        {/* Warehouse Selection */}
        <div className="mb-6">
          <label htmlFor="warehouse" className="block text-gray-900 dark:text-gray-200">
            Selecciona un almacén
          </label>
          <select
            id="warehouse"
            value={selectedWarehouse?.id || ""}
            onChange={(e) =>
              setSelectedWarehouse(
                warehouses.find(
                  (warehouse) => warehouse.id === Number(e.target.value)
                ) || null
              )
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900 dark:text-gray-200"
          >
            <option value="">Seleccione un almacén</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>

        {/* Client Search */}
        <div className="mb-6">
          <label htmlFor="client" className="block text-gray-900 dark:text-gray-200">
            Busca un cliente
          </label>
          <input
            id="client"
            type="text"
            value={searchClient}
            onChange={handleClientSearch}
            placeholder="Buscar cliente"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900 dark:text-gray-200"
          />
          {filteredClients.length > 0 && (
            <ul className="mt-2 max-h-32 overflow-y-auto bg-gray-400 dark:bg-gray-800 rounded-md">
              {filteredClients.map((clientItem) => (
                <li
                  key={clientItem.id}
                  onClick={() => handleSelectClient(clientItem)}
                  className={`p-2 hover:bg-gray-400 cursor-pointer ${
                    client && client.id === clientItem.id ? "bg-gray-400 dark:bg-gray-800" : ""
                  }`}
                >
                  {clientItem.name}
                </li>
              ))}
            </ul>
          )}
          {client && (
            <div className="mt-2 p-2 bg-gray-400/40 dark:bg-gray-700 rounded-md">
              Cliente Seleccionado: <strong>{client.name}</strong>
            </div>
          )}
        </div>

        {/* Article Search */}
        <div className="mb-6">
          <label htmlFor="article" className="block text-gray-900 dark:text-gray-200">
            Busca un artículo
          </label>
          <input
            id="article"
            type="text"
            value={searchArticle}
            onChange={handleArticleSearch}
            placeholder="Buscar artículo"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900 dark:text-gray-200"
          />
          {filteredArticles.length > 0 && (
            <ul className="mt-2 max-h-32 overflow-y-auto bg-gray-400/40 dark:bg-gray-800 rounded-md">
              {filteredArticles.map((article) => (
                <li
                  key={article.id}
                  onClick={() => handleSelectArticle(article)}
                  className={`p-2 hover:bg-gray-400 cursor-pointer ${
                    selectedArticle?.id === article.id ? "bg-gray-400 dark:bg-gray-700" : ""
                  }`}
                >
                  {article.name} - ${article.price}
                </li>
              ))}
            </ul>
          )}
          {selectedArticle && (
            <div className="mt-2 p-2 bg-gray-400 dark:bg-gray-700 rounded-md">
              Artículo Seleccionado: <strong>{selectedArticle.name}</strong>
            </div>
          )}
        </div>

        {/* Quantity Input */}
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-gray-900 dark:text-gray-200">
            Cantidad
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900 dark:text-gray-200"
          />
        </div>

        {/* Discount Input */}
        <div className="mb-6">
          <label htmlFor="discount" className="block text-gray-900 dark:text-gray-200">
            Descuento (Opcional)
          </label>
          <input
            id="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            min={0}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900 dark:text-gray-200"
            placeholder="Ingrese descuento si aplica"
          />
        </div>

        {/* Add Item Button */}
        <button
          onClick={handleAddItem}
          disabled={!selectedArticle}
          className={`w-full p-2 bg-blue-900 dark:bg-green-900 text-base lg:text-sm text-gray-100 dark:hover:bg-green-700 dark:text-white rounded-md mt-6 ${
            !selectedArticle ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Agregar Artículo
        </button>
      </div>
      <div className="w-full px-4 py-4 lg:w-4/12">
        {/* Invoice Items List */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            Artículos Facturados
          </h3>
          {items.length > 0 ? (
            <ul className="space-y-4 mt-4">
              {items.map((item) => (
                <li
                  key={item.articleId}
                  className="flex justify-between gap-2 items-center bg-gray-400 dark:bg-gray-700 rounded-md p-2 mt-2 text-gray-800 dark:text-gray-200"
                >
                  <div className="flex flex-col w-8/12 justify-between text-sm text-gray-800 dark:text-gray-200">
                      <div>
                        {item.name} x {item.quantity} {" "}
                        <strong>${item.subtotal}</strong>
                      </div>
                      {item.discount > 0 && `Descuento: $${item.discount}`}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.articleId)}
                    className="bg-red-500 text-white hover:bg-red-700 rounded px-4 "
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-800 dark:text-gray-200">No hay artículos agregados.</p>
          )}
        </div>

        {/* Total */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Total: ${totalAmount}
          </h3>
        </div>

        {/* Notes Input */}
        <div className="mt-6">
      <label htmlFor="notes" className="block text-gray-300 dark:text-gray-200">
        Notas adicionales (Opcional)
      </label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Escribe aquí notas adicionales, por ejemplo, información de garantía."
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900 dark:text-gray-200"
        rows={4}
      />
    </div>

        {/* Generate Invoice Button */}
        <button
          onClick={handleGenerateInvoice}
          disabled={!client || !selectedWarehouse || items.length === 0}
          className={`w-full p-2 bg-blue-900 dark:bg-green-900 text-base lg:text-sm text-gray-100 dark:hover:bg-green-700 dark:text-white rounded-md mt-6 ${
            !client || !selectedWarehouse || items.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Generar Factura
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
