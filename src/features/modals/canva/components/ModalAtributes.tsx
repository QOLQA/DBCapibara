import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useState, useRef, useEffect } from "react";

interface Atribute {
  name: string;
  type: string;
}

interface ModalAtributesProps {
  onSubmit: (newAtributes: Atribute[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalAtributes: React.FC<ModalAtributesProps> = ({
  onSubmit,
  open,
  setOpen,
}) => {
  const [newAtributes, setNewAtributes] = useState<Atribute[]>([]);
  const [showFormNewAtribute, setShowFormNewAtribute] = useState(false);

  const handleSubmit = () => {
    onSubmit(newAtributes);
    setOpen(false);
  }

  const [newTableName, setNewTableName] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleAddNewAtribute = () => {
    setNewAtributes([...newAtributes, { name: "", type: "" }]);
  };

  // return <Modal title={typeModal} onClose={handleClose} onSubmit={handleSubmit} modalRef={modalRef} >
  return (
    <Modal title="Agregar Atributos" onSubmit={handleSubmit} open={open} setOpen={setOpen}>
      <div className="flex flex-col gap-2">
        {newAtributes.map((atribute, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <Input
              placeholder="Nombre"
              value={atribute.name}
              onChange={e => {
                const updated = [...newAtributes];
                updated[idx].name = e.target.value;
                setNewAtributes(updated);
              }}
              className="w-1/2"
            />
            <select
              value={atribute.type}
              onChange={e => {
                const updated = [...newAtributes];
                updated[idx].type = e.target.value;
                setNewAtributes(updated);
              }}
              className="w-1/2 bg-terciary-gray text-white border border-gray rounded-md py-2 px-3"
            >
              <option value="">select</option>
              <option value="VARCHAR(255)">VARCHAR(255)</option>
              <option value="INT">INT</option>
              <option value="BOOLEAN">BOOLEAN</option>
            </select>
            <Button
              variant="ghost"
              className="text-red"
              onClick={() => {
                setNewAtributes(newAtributes.filter((_, i) => i !== idx));
              }}
            >
              X
            </Button>
          </div>
        ))}
        <div className="flex justify-center w-full border-dashed border-2 border-gray rounded-lg p-4">
          <Button className="cursor-pointer hover:bg-gray bg-transparent rounded-lg text-secondary-white  border border-gray" onClick={handleAddNewAtribute}>
            nuevo atributo
          </Button>
        </div>
      </div>
    </Modal>
  )
};

export default ModalAtributes;
