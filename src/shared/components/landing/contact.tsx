"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  message: z.string(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (
    values: ContactFormValues
  ) => {
    alert(JSON.stringify(values, null, 2));
    // Handle form submission, e.g., send data to a server
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values),
    // }).then(response => {
    //   if (response.ok) {
    //     alert('Message sent successfully');
    //   } else {
    //     alert('Failed to send message');
    //   }
    // }).catch(error => {
    //   console.error('Error:', error);
    //   alert('An error occurred');
    // });
  };

  return (
    <section id="contact" className="bg-slate-50 py-20 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Contactez Nous</h2>
        <div className="mx-auto max-w-3xl">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Votre nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean Dupont" {...field} />
                    </FormControl>
                    <FormDescription>
                      {form.formState.errors.username?.message}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      {form.formState.errors.email?.message}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Écrivez votre message"
                        rows={16}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {form.formState.errors.message?.message}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Envoyer
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
