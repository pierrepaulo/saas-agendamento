"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogService } from "./dialog-service";
import { Service } from "@prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServicesListProps {
  services: Service[];
}

export function ServicesLis({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<null | Service>(null);

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId: serviceId });
    if (response.error) {
      toast(response.error);
      return;
    }
    toast.success(response.data);
  }

  function handleEditService(service: Service) {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setEditingService(null);
        }
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Serviços
            </CardTitle>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault();
                setIsDialogOpen(false);
                setEditingService(null);
              }}
            >
              <DialogService
                closeModal={() => {
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}
                serviceId={editingService ? editingService.id : undefined}
                initialValues={
                  editingService
                    ? {
                        name: editingService.name,
                        price: (editingService.price / 100)
                          .toFixed(2)
                          .replace(".", ","),
                        hours: Math.floor(
                          editingService.duration / 60
                        ).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-gray-600">-</span>
                    <span className="text-gray-600">
                      {formatCurrency(service.price / 100)}
                    </span>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditService(service)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
