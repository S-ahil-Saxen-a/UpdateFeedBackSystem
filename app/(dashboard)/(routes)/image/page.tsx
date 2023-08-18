"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Heading from "@/components/Heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { ChatCompletionRequestMessage } from "openai";

import { cn } from "@/lib/utils";
import UserAvatar from "@/components/User-avatar";
import BotAvatar from "@/components/Bot-avatar";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [previous, setPrevious] = useState("");
  // const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     setImages([]); // empty previous generated images with new from submit

  //     // console.log(values)
  //     const response = await axios.post("/api/image", values);

  //     const urls = response.data.map((image: { url: string }) => image.url);

  //     setImages(urls);

  //     form.reset();
  //   } catch (error) {
  //     // TODO: Open Pro Model
  //     console.log(error);
  //   } finally {
  //     router.refresh();
  //   }
  // };

  const onAskSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]); // empty previous generated images with new from submit

      console.log("Previous value: " + JSON.stringify(values));

      setPrevious(""); // reset all previous queries
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const modifiedQueryResponse = await axios.post("/api/conversation", {
        messages: [userMessage],
      });

      const modifiedQuery = modifiedQueryResponse.data;
      modifiedQuery.content = modifiedQuery.content.replaceAll('"', "");
      setPrevious(modifiedQuery.content);
      console.log("mq " + JSON.stringify(modifiedQuery));
      values.prompt = modifiedQuery.content;

      console.log("Updated value: " + JSON.stringify(values));

      const response = await axios.post("/api/image", values);
      // return;
      console.log("Response:", response);

      // const urls = response.data.map((image: { url: string }) => image.url);
      console.log("my url", response.data[0].url);
      const url = response.data[0].url;
      setImages([url]);

      form.reset();
    } catch (error) {
      // TODO: Open Pro Model
      console.log(error, "Page.tsx");
    } finally {
      router.refresh();
    }

    console.log(JSON.stringify(values) + "onAsk");
  };

  const onUpdateSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]); // empty previous generated images with new from submit

      values.prompt = previous + " " + values.prompt;

      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const modifiedQueryResponse = await axios.post("/api/conversation", {
        messages: [userMessage],
      });

      const modifiedQuery = modifiedQueryResponse.data;
      modifiedQuery.content = modifiedQuery.content.replaceAll('"', "");
      setPrevious(modifiedQuery.content);

      values.prompt = modifiedQuery.content;

      // console.log(values)
      const response = await axios.post("/api/image", values);

      console.log("updated url: ", response.data);
      const url = response.data[0].url;
      setImages([url]);

      form.reset();
    } catch (error) {
      // TODO: Open Pro Model
      console.log(error);
    } finally {
      router.refresh();
    }
    console.log(JSON.stringify(values) + "onUpdate");
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <div className="w-full flex items-center content-between rounded-lg border p-4 px-3 md:px-6 focus-within:shadow-sm">
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="w-full grid grid-cols-12 gap-2"
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6">
                      {/* <FormLabel /> */}
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="A picture of birds in the sky"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription /> */}
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                {/* <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              /> */}
                {/* <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              /> */}
              </form>
              <div className="flex gap-4">
                <Button
                  // onSubmit={form.handleSubmit(onSubmit)}
                  onClick={() => onAskSubmit(form.getValues())}
                  className="col-span-12 lg:col-span-2 w-full px-8"
                  disabled={isLoading}
                >
                  ASK
                </Button>
                <Button
                  onClick={() => onUpdateSubmit(form.getValues())}
                  className="col-span-12 lg:col-span-2 w-full px-8"
                  disabled={isLoading}
                >
                  Update
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center">
              <Loader />
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <Empty label="Start generating images by your prompt!" />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="Image" fill src={src} />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(src)}
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
