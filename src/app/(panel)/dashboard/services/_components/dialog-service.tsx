"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from "./dialog-service-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { converteRealToCentes } from "@/utils/convertCurrency";
import { createNewService } from "../_actions/create-service";

export function DialogService() {
  const form = useDialogServiceForm();

  async function onSubmit(values: DialogServiceFormData) {
    const priceInCents = converteRealToCentes(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;

    const duration = hours * 60 + minutes;

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });
    //console.log(response);
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");
    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adcione um novo serviço</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Nome do serviço:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite o nome do serviço..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Valor do serviço:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex: 199,99"
                      onChange={changeCurrency}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p>Tempo de duração do serviço</p>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Horas:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1" min="0" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel>Minutos:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0" min="0" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full font-semibold text-white">
            Adicionar serviço
          </Button>
        </form>
      </Form>
    </>
  );
}
