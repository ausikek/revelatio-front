"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserSchema, UserT } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Revelatio } from "@/assets";
import Image from "next/image";

export default function LoginForm() {
  const form = useForm<UserT>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { status } = useSession();
  const [error, setError] = useState<boolean>(false);

  if (status === "authenticated") {
    redirect("/tasks");
  }

  const handleLogin = async (data: UserT) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (result?.error) {
      setError(true);
      return;
    }

    setError(false);
    try {
      redirect("/tasks");
    } catch {}
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-2"
        >
          <Image src={Revelatio} alt="logo revelatio" className="rounded-md" />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira sua senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
      <span className="text-red-500">
        {error && "Usuário ou senha inválidos"}
      </span>
    </div>
  );
}
