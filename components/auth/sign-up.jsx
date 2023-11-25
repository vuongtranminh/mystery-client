"use client"

import { Eye, EyeOff } from "lucide-react";
import { TextField, TextFieldInput, TextFieldSlot } from "../ui/text-field";
import SocialAuth from "./social-auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authApi from "@/app/api/auth.api";
import { useRouter } from "next/navigation";
import { fetchClientSide } from "@/app/api/fetch.client.api";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Channel name is required."
  }),
  lastName: z.string().min(1, {
    message: "Channel name is required."
  }),
  email: z.string().min(1, {
    message: "Channel name is required."
  }),
  password: z.string().min(1, {
    message: "Channel name is required."
  }),
  confirmPassword: z.string().min(1, {
    message: "Channel name is required."
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

export default function SignUp() {

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (values) => {
    const { response, err } = await fetchClientSide(authApi.signup, {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
    })

    if (response?.success) {
      form.reset();
      router.push("/sign-in");
    }
  }

  return (
    <div className="flex flex-col h-full justify-start items-center py-20">
      <div className="flex flex-col gap-6">
        <div className="box-border w-fit">
          <div className="flex flex-col items-stretch justify-start gap-8 rounded bg-white w-96 my-0 mx-7 py-10 px-8">
            {/* logo */}
            <div className="flex flex-row items-stretch justify-start h-[24px] object-cover">
              <a className="box-border inline-flex items-center m-0 cursor-pointer no-underline font-normal text-sm text-slate-600">
                <img
                  crossOrigin="anonymous"
                  srcSet="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJGcEdOWFdBUGlyVHBSMEFnTXJXM2c1V0t2Qy5wbmcifQ?width=200 1x,https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJGcEdOWFdBUGlyVHBSMEFnTXJXM2c1V0t2Qy5wbmcifQ?width=400 2x"
                  src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJGcEdOWFdBUGlyVHBSMEFnTXJXM2c1V0t2Qy5wbmcifQ?width=400"
                  className="inline-block h-full"
                  alt="Clerk"
                />
              </a>
            </div>

            {/* header */}
            <div className="flex flex-col items-stretch justify-start gap-1">
              <h1 className="box-border text-black m-0 font-semibold text-xl">
                Sign in
              </h1>
              <p className="box-border text-slate-400 m-0 text-base font-normal">
                to continue to Clerk
              </p>
            </div>

            {/* main */}
            <div className="flex flex-col items-stretch justify-start gap-8">
              {/* social button */}
              <SocialAuth />

              {/* divider */}
              <div className="flex flex-row flex-nowrap items-center justify-center">
                <div className="flex flex-row flex-nowrap items-stretch justify-start flex-1 h-[1px] bg-slate-300"></div>
                <p className="box-border text-slate-500 text-sm font-medium my-0 mx-4">
                  or
                </p>
                <div className="flex flex-row flex-nowrap items-stretch justify-start flex-1 h-[1px] bg-slate-300"></div>
              </div>

              {/* form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-nowrap items-stretch justify-start gap-4">
                  <div className="flex flex-row flex-nowrap items-stretch justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                          >
                            First name
                          </FormLabel>
                          <FormControl>
                            <TextFieldInput
                              placeholder="Enter first name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                          >
                            Last name
                          </FormLabel>
                          <FormControl>
                            <TextFieldInput
                              placeholder="Enter last name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                          >
                            Email
                          </FormLabel>
                          <FormControl>
                            <TextFieldInput
                              placeholder="Enter email address"
                              {...field}
                            />
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
                          <FormLabel
                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                          >
                            Password
                          </FormLabel>
                          <FormControl>
                            <TextField>
                              <TextFieldInput
                                placeholder="Enter password"
                                type={showPassword ? 'text' : 'password'}
                                {...field}
                              />
                              <TextFieldSlot onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Eye /> : <EyeOff />}
                              </TextFieldSlot>
                            </TextField>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                          >
                            Confirm password
                          </FormLabel>
                          <FormControl>
                            <TextField>
                              <TextFieldInput
                                placeholder="Enter confirm password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...field}
                              />
                              <TextFieldSlot onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <Eye /> : <EyeOff />}
                              </TextFieldSlot>
                            </TextField>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  <button className="m-0 py-3 px-5 border-0 outline-0 select-none cursor-pointer bg-indigo-700 text-white rounded inline-flex justify-center items-center transition font-semibold text-xs tracking-wider uppercase min-h-[2.25rem] w-full hover:bg-indigo-800">Continue</button>
                </form>
              </Form>
            </div>

            {/* footer */}
            <div className="flex flex-row flex-nowrap items-stretch justify-start gap-1">
              <span className="box-border text-slate-400 text-sm font-normal">Has account?</span>
              <Link href="/sign-in" className="box-border inline-flex items-center m-0 cursor-pointer no-underline font-normal text-sm text-indigo-600">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
