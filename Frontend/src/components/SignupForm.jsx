import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stage } from "@react-three/drei";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom"; // added Link import
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

// 3D Shopping Bag from primitives
function ShoppingBagPrimitive() {
  return (
    <Float>
      <group scale={1.2}>
        {/* Bag Body */}
        <mesh>
          <boxGeometry args={[1.2, 1.5, 0.5]} />
          <meshStandardMaterial color="#8e44ad" />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 1, 0]}>
          <torusGeometry args={[0.4, 0.05, 16, 100, Math.PI]} />
          <meshStandardMaterial color="#6c3483" />
        </mesh>
      </group>
    </Float>
  );
}

// Form Schema
const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Select a country"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password too short"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

// SignupForm component
const SignupForm = ()=> {
  const navigate = useNavigate();
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
  });

  const onSubmit = (data) => {
    const fullPhone = data.phone ? `${data.country}${data.phone}` : "";
  
    const user = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      phone: fullPhone,
      country: data.country, // country code like +92
    };

    fetch('http://localhost:3001/api/v1/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data.status? toast.success(data.message) : toast.error(data.message)
    })
    .catch(error => {
      console.log(error.message)
    })
   
  };  

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
        if (status >= 400) throw new Error(data.message || "Google sign-in failed");
        navigate("/");
      })
      .catch(err => {
        console.error("Google login error:", err.message);
        googleLogout();
      });
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 overflow-hidden px-4 py-12">
      <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 3, 5]} intensity={1} />
        <OrbitControls enableZoom={false} autoRotate />
        <Stage environment="city" intensity={0.6}>
          <ShoppingBagPrimitive />
        </Stage>
      </Canvas>

      <div className="signup-div relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white/90 backdrop-blur rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Create Your Account</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="fullName" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="email" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="country" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <select {...field} className="w-full h-10 rounded-md border border-input px-3 text-sm">
                    <option value="">Select country</option>
                    <option value="+1">United States</option>
                    <option value="+1">Canada</option>
                    <option value="+52">Mexico</option>
                    <option value="+55">Brazil</option>
                    <option value="+44">United Kingdom</option>
                    <option value="+49">Germany</option>
                    <option value="+33">France</option>
                    <option value="+39">Italy</option>
                    <option value="+34">Spain</option>
                    <option value="+31">Netherlands</option>
                    <option value="+48">Poland</option>
                    <option value="+46">Sweden</option>
                    <option value="+32">Belgium</option>
                    <option value="+61">Australia</option>
                    <option value="+81">Japan</option>
                    <option value="+91">India</option>
                    <option value="+971">United Arab Emirates</option>
                    <option value="+966">Saudi Arabia</option>
                    <option value="+65">Singapore</option>
                    <option value="+90">Turkey</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="phone" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input type="tel" placeholder="3001234567" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="confirmPassword" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Sign Up</Button>

            <div className="text-center text-gray-500 my-2">or</div>

            <GoogleLogin onSuccess={handleSignInWithGoogle} onError={() => googleLogout()} auto_select={true} />
          </form>
        </Form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-purple-700">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-purple-900 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;