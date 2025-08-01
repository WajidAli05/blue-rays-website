import React, { useEffect, useState } from "react"
import { useCart } from "../contexts/CartContext"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { MapPin, Package, CreditCard } from "lucide-react"
import { toast } from "sonner";

const ShippingPage = () => {
  const { cartItems } = useCart()
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States"
  })

  const [errors, setErrors] = useState({})

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.productId.price, 0)
  const shippingCost = 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shippingCost + tax

  //fetch existing shipping data if available
useEffect(() => {
  fetch('http://localhost:3001/api/v1/shipping/user', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(result => {
      const shipping = result?.data?.[0]; // safely get the first shipping record
      if (shipping) {
        setShippingData(prev => ({
          ...prev,
          firstName: shipping.firstName || "",
          lastName: shipping.lastName || "",
          email: shipping.email || "",
          phone: shipping.phone || "",
          address: shipping.address || "",
          apartment: shipping.apartment || "",
          city: shipping.city || "",
          state: shipping.state || "",
          postalCode: shipping.postalCode || "",
          country: shipping.country || "United States"
        }));
      }
    })
    .catch(error => {
      console.error("Error fetching shipping data:", error);
    });
}, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart")
    }
  }, [cartItems, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!shippingData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!shippingData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!shippingData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(shippingData.email)) newErrors.email = "Email is invalid"
    if (!shippingData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!shippingData.address.trim()) newErrors.address = "Address is required"
    if (!shippingData.city.trim()) newErrors.city = "City is required"
    if (!shippingData.state.trim()) newErrors.state = "State is required"
    if (!shippingData.postalCode.trim()) newErrors.postalCode = "Postal code is required"
    if (!shippingData.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsDrawerOpen(true)
      
      //post the shipping data to the server
      fetch('http://localhost:3001/api/v1/shipping', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shippingData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        toast.success("Shipping information submitted successfully!");
      })
      .catch(error => {
        toast.error("Failed to submit shipping information.");
      });
    }
  }

  const handleProceedToPayment = () => {
    // Here you would typically process the order
    console.log("Processing order with shipping data:", shippingData)
    console.log("Cart items:", cartItems)
    console.log("Total:", total)
    
    // For now, just show an alert
    alert("Proceeding to payment...")
    setIsDrawerOpen(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Shipping Information</h1>
        <p className="text-gray-600 mt-2">Please provide your shipping details to complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </CardTitle>
            <CardDescription>
              Enter the address where you'd like your order delivered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={shippingData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={shippingData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={shippingData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={shippingData.address}
                  onChange={handleInputChange}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input
                  id="apartment"
                  name="apartment"
                  value={shippingData.apartment}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingData.city}
                    onChange={handleInputChange}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={shippingData.state}
                    onChange={handleInputChange}
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={shippingData.postalCode}
                    onChange={handleInputChange}
                    className={errors.postalCode ? "border-red-500" : ""}
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={shippingData.country}
                    onChange={handleInputChange}
                    className={errors.country ? "border-red-500" : ""}
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Review Order
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/cart")}
                >
                  Back to Cart
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId._id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.productId.name}</span>
                  <span className="text-gray-500 ml-2">× {item.quantity}</span>
                </div>
                <span className="font-semibold">${(item.quantity * item.productId.price).toFixed(2)}</span>
              </div>
            ))}

            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Order Confirmation
            </DrawerTitle>
            <DrawerDescription>
              Please review your order details before proceeding to payment
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4 pb-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Shipping Address and Order Items */}
              <div className="space-y-6">
                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{shippingData.firstName} {shippingData.lastName}</p>
                    <p>{shippingData.address}</p>
                    {shippingData.apartment && <p>{shippingData.apartment}</p>}
                    <p>{shippingData.city}, {shippingData.state} {shippingData.postalCode}</p>
                    <p>{shippingData.country}</p>
                    <p>Email: {shippingData.email}</p>
                    <p>Phone: {shippingData.phone}</p>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex justify-between items-center text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-medium">${(item.quantity * item.productId.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Order Total */}
              <div>
                <div>
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={handleProceedToPayment} className="w-full">
              Proceed to Payment
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Back to Shipping</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default ShippingPage