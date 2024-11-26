"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransctionDialog from "./upsert-transaction-dialog";

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);


  return (
    <>
      <Button className="rounded-full font-bold" onClick={() => setDialogIsOpen(true)}>
        Adicionar transações
        <ArrowDownUpIcon/>
      </Button>
      <UpsertTransctionDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen}/>
    </>
  );
}
 
export default AddTransactionButton;