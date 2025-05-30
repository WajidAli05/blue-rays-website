import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import { useNavigate } from 'react-router-dom';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// 🌍 Country list with codes
const countries = [
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "Pakistan", code: "+92" },
  { name: "India", code: "+91" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  // Add more countries as needed
]

// ✅ Zod schema for validation
const formSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    country: z.string("Select a country"),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 7 && val.length <= 15), {
        message: "Phone number must be between 7 and 15 digits",
      }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function SignupForm() {
  const navigate = useNavigate();

    //handle google sign in success
  // const handleSignInWithGoogle= (response)=> {
  //   const { credential } = response;
  //   fetch("http://localhost:3001/api/v1/signup/google", 
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({googleToken: credential}),
  //       credentials: 'include'
  //     },
  //   )
  //   .then((response)=> {
  //     console.log("Response from server:", response);
  //     if(!response.ok){
  //       throw new Error(`Server responded with status ${response.status}`);
  //     }
  //   })
  //   .then((data)=> {
  //     console.log(data);
  //     navigate("/home")
  //   })
  //   .catch((error)=> {
  //     console.error("Error during Google sign-in:", error);
  //     googleLogout();
  //   });
  // }

  const handleSignInWithGoogle = (response) => {
  const { credential } = response;

  fetch("http://localhost:3001/api/v1/signup/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ googleToken: credential }),
  })
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
      if (status >= 400) {
        throw new Error(data.message || "Google sign-in failed");
      }

      console.log("Google Sign-In success:", data);
      navigate("/home");
    })
    .catch(err => {
      console.error("Error during Google sign-in:", err.message);
      googleLogout();
    });
};

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Form Submitted:", data)
    // Handle form submission (e.g., API call)
  }

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Create an Account</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country Dropdown */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Country</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select country</option>
                    {countries.map((c) => (
                      <option key={c.code + c.name} value={c.code}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="e.g., 3001234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          {/* OR divider */}
          <div className="relative text-center">
            <span className="absolute inset-x-0 top-1/2 border-t border-gray-300"></span>
            <span className="relative bg-white px-2 text-sm text-gray-500">or</span>
          </div>

          {/* Google Sign-Up Button */}
          <GoogleLogin
            onSuccess={(response)=> handleSignInWithGoogle(response)}
            onError={()=> googleLogout()}  
            auto_select= {true}
          />
        </form>
      </Form>
    </div>
  )
}