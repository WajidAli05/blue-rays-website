import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stage } from "@react-three/drei";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Zod schema (optional but supported even in JS projects)
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 🎨 3D Lock icon
function LockIcon3D() {
  return (
    <Float>
      <group scale={1.5}>
        {/* Box Body */}
        <mesh>
          <boxGeometry args={[1.2, 1.5, 0.5]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
        {/* Top Handle */}
        <mesh position={[0, 1, 0]}>
          <torusGeometry args={[0.4, 0.05, 16, 100, Math.PI]} />
          <meshStandardMaterial color="#3730a3" />
        </mesh>
      </group>
    </Float>
  );
}

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // Replace with real API call
    navigate("/");
  };

  const handleGoogleLogin = (response) => {
    const { credential } = response;
    fetch("http://localhost:3001/api/v1/login/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ googleToken: credential }),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status >= 400) throw new Error(data.message || "Google login failed");
        navigate("/");
      })
      .catch((err) => {
        console.error("Google login error:", err.message);
        googleLogout();
      });
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-200 px-4 py-12">
      {/* 3D Canvas */}
      <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <OrbitControls enableZoom={false} autoRotate />
        <Stage environment="city" intensity={0.5}>
          <LockIcon3D />
        </Stage>
      </Canvas>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-indigo-700">
          Login to Your Account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Login
            </Button>
          </form>
        </Form>

        <div className="text-center text-gray-500">or</div>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => googleLogout()}
          auto_select={true}
        />

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-sm text-indigo-700">
          Don't have an account?{" "}
          <Link to="/signup" className="underline hover:text-indigo-900 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;