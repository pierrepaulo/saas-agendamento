"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogService } from "./dialog-service";

export function ServicesLis() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Serviços
            </CardTitle>
            <DialogTrigger>
              <Button>
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogService
                closeModal={() => {
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </CardHeader>
        </Card>
      </section>
    </Dialog>
  );
}
