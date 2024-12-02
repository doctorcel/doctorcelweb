import { useEffect, useState } from "react";
import { useInvoiceStore } from "@/stores/useStore";
import { PDFDocument } from "pdf-lib";

type Client = {
  id: number;
  name: string;
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
};

interface Warehouse {
  id: number;
  name: string;
  description: string | null; // ya que es opcional en el esquema
  articles: Article[]; // Relación con el modelo Article
}

const generatePDF = async (invoiceData: any) => {
  const doc = await PDFDocument.create();
  const page = doc.addPage([320, 480]);

  // Add text, tables, or any content you need for the invoice
  page.drawText(`Factura No: ${invoiceData.number}`, {
    x: 50,
    y: 450,
    size: 12,
  });
  page.drawText(`Cliente: ${invoiceData.clientName}`, {
    x: 50,
    y: 430,
    size: 12,
  });

  // Add items to the PDF
  let yPosition = 410;
  invoiceData.items.forEach((item: InvoiceItem) => {
    page.drawText(`${item.quantity} x ${item.name} - $${item.price}`, {
      x: 50,
      y: yPosition,
      size: 10,
    });
    yPosition -= 20;
  });

  // Save the PDF and handle printing
  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Factura_${invoiceData.number}.pdf`;
  link.click();
};

const InvoiceForm = () => {
  const { setClient, addItem, items, client } = useInvoiceStore();
  const [clients, setClients] = useState<Client[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );

  // Fetch clients and articles
  useEffect(() => {
    const fetchData = async () => {
      const clientsResponse = await fetch("/api/client");
      const clientsData: Client[] = await clientsResponse.json();
      setClients(clientsData);

      const articlesResponse = await fetch("/api/articles");
      const articlesData: Article[] = await articlesResponse.json();
      setArticles(articlesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        // Obtener el token del localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token no encontrado");
        }

        const response = await fetch("/api/warehouses", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en la cabecera
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

  // Function to add an item
  const handleAddItem = () => {
    if (!selectedArticle) return;
    addItem({
      articleId: selectedArticle.id,
      quantity,
      price: selectedArticle.price,
      name: selectedArticle.name,
    });
  };

  // Function to delete an item
  const handleRemoveItem = (articleId: number) => {
    addItem({ articleId, quantity: 0, price: 0, name: "" }); // Mark the item for removal
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleGenerateInvoice = async () => {
    if (!client) {
      alert("Debes seleccionar un cliente.");
      return;
    }

  // Calculate total price
  const totalAmount = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const invoiceData = {
    number: Math.floor(Math.random() * 1000000),
    clientId: client.id,
    companyInfoId: 1, // Asegúrate de incluir este campo
    clientName: client.name,
    clientAddress: client.address || "",
    clientPhone: client.phone || "",
    clientEmail: client.email || "",
    clientTaxId: client.taxId || "",
    warehouseId: selectedWarehouse?.id || 1,
    items: items.map((item) => ({
      articleId: item.articleId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      cost: 0, // Asegúrate de que este campo esté incluido si es necesario
      subtotal: item.quantity * item.price,
      discount: 0, // Ajusta si se aplica descuento
    })),
    total: totalAmount,
  };

    // Llamada a la API para guardar la factura en la base de datos
    const response = await fetch("/api/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });
    
    if (response.ok) {
      const responseData = await response.json();
      generatePDF(responseData);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}\nDetalles: ${errorData.details.join(", ")}`);
    }
  }    

  const handleArticleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArticle =
      articles.find((article) => article.id === Number(e.target.value)) || null;
    setSelectedArticle(selectedArticle);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-md mt-8">
      {/* Warehouse Selection */}
      <div className="mb-6">
        <label htmlFor="warehouse" className="block text-gray-700">
          Selecciona un almacén
        </label>
        <select
          id="warehouse"
          onChange={(e) =>
            setSelectedWarehouse(
              warehouses.find(
                (warehouse) => warehouse.id === Number(e.target.value)
              ) || null
            )
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccione un almacén</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>
      </div>

      {/* Client Selection */}
      <div className="mb-6">
        <label htmlFor="client" className="block text-gray-700">
          Selecciona un cliente
        </label>
        <select
          id="client"
          onChange={(e) =>
            setClient(
              clients.find((client) => client.id === Number(e.target.value))
            )
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccione un cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* Article Selection */}
      <div className="mb-6">
        <label htmlFor="article" className="block text-gray-700">
          Selecciona un artículo
        </label>
        <select
          id="article"
          onChange={handleArticleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccione un artículo</option>
          {articles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.name} - ${article.price}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Input */}
      <div className="mb-6">
        <label htmlFor="quantity" className="block text-gray-700">
          Cantidad
        </label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Add Item Button */}
      <button
        onClick={handleAddItem}
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Agregar Artículo
      </button>

      {/* Item List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Artículos seleccionados</h3>
        <ul className="mt-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between p-2 border-b">
              <span>
                {
                  articles.find((article) => article.id === item.articleId)
                    ?.name
                }
              </span>
              <span>
                {item.quantity} x ${item.price}
              </span>
              <button
                onClick={() => handleRemoveItem(item.articleId)}
                className="text-red-500 ml-2"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="mt-6">
        <p className="text-lg font-semibold">Total: ${totalAmount}</p>
      </div>

      {/* Generate Invoice Button */}
      <button
        onClick={handleGenerateInvoice}
        className="w-full p-2 mt-6 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Generar Factura
      </button>
    </div>
  );
};

export default InvoiceForm;
