import React, { useId, useEffect, ComponentProps } from "react";
import { useDropdownContext } from "@/contexts/dropdown-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

type DropdownMenuProps = ComponentProps<typeof DropdownMenu>;

interface ManagedDropdownMenuProps extends DropdownMenuProps {
  id?: string;
  children: React.ReactNode;
}

export const ManagedDropdownMenu = ({
  id: propId,
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  ...props
}: ManagedDropdownMenuProps) => {
  // Generar ID único si no se proporciona
  const generatedId = useId();
  const id = propId || generatedId;

  const { activeDropdownId, setActiveDropdown } = useDropdownContext();

  // Determinar si este menú está abierto
  const isThisOpen = activeDropdownId === id;

  // Manejar cambios en el estado del menú
  const handleOpenChange = (open: boolean) => {
    // Si el menú se está abriendo, establecerlo como activo
    if (open) {
      setActiveDropdown(id);
    }
    // Si este menú se está cerrando, limpiar el menú activo
    else if (activeDropdownId === id) {
      setActiveDropdown(null);
    }

    // Propagar al controlador de cambio de apertura proporcionado si existe
    if (controlledOnOpenChange) {
      controlledOnOpenChange(open);
    }
  };

  return (
    <DropdownMenu
      open={controlledOpen !== undefined ? controlledOpen : isThisOpen}
      onOpenChange={handleOpenChange}
      {...props}
    >
      {children}
    </DropdownMenu>
  );
};
