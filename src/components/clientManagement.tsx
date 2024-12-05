"use client";

import React, { useState } from "react";
import CreateProduct from "./ui/createProduct";
import InvoiceForm from "./ui/invoice/invoiceform";



const ClientManagement: React.FC = () => {

  return (
    <div className="p-0">
      <div className="flex gap-5 items-center w-full">
      <CreateProduct />
      </div>
      <InvoiceForm />
    </div>
  );
};

export default ClientManagement;
