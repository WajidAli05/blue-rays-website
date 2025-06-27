"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import {
  Home,
  Info,
  HelpCircle,
  Phone,
  ShoppingCart,
  LogIn,
  LogOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const NavBar = () => {
  const { user, login, logout, isInitialCheckDone } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    login(data.email, data.password, () => {
      setLoginDialogOpen(false);
      form.reset();
    });
  };

  const handleLogout = () => logout();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/faqs", label: "FAQs", icon: HelpCircle },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <>
      <div className="w-full bg-background border-b shadow-sm z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Navigation Links */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {links.map(({ to, label, icon: Icon }) => (
                <NavigationMenuItem key={to}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={to}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                        ${
                          location.pathname === to
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:bg-muted hover:text-primary"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative text-muted-foreground hover:text-primary hover:scale-110 transition-transform"
            >
              <Badge
                className="absolute -top-3 -right-4 h-5 min-w-5 rounded-full px-1 text-xs font-mono tabular-nums z-10"
                variant="destructive"
              >
                {totalItems}
              </Badge>
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {!isInitialCheckDone ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : !user ? (
              <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    className="text-muted-foreground hover:text-primary hover:scale-110 transition-transform"
                    title="Login"
                  >
                    <LogIn className="w-5 h-5" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                      Enter your credentials to access your account.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
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
                              <Input type="password" placeholder="••••••••" {...field} />
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
                </DialogContent>
              </Dialog>
            ) : (
              <button
                onClick={handleLogout}
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-transform"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;