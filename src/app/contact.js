"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiMessageSquare, FiSend, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify"; 

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const response = await fetch("https://formspree.io/f/xdkekzgv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Message sent successfully!", { position: "top-right", pauseOnHover: false });
        reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error with the form submission.", { position: "top-right", pauseOnHover: false });
    }
  };

  return (
    <>
      <ToastContainer
       closeOnClick
       draggable
       className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2">Name</label>
          <div className="flex items-center bg-gray-700 rounded-lg p-3">
            <FiUser className="mr-2" />
            <input
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="bg-transparent flex-1 outline-none w-full text-sm md:text-base"
              name="name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <div className="flex items-center bg-gray-700 rounded-lg p-3">
            <FiMail className="mr-2" />
            <input
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="bg-transparent flex-1 outline-none w-full text-sm md:text-base"
              name="email"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-2">Your Message</label>
          <div className="flex items-center bg-gray-700 rounded-lg p-3">
            <FiMessageSquare className="mr-2" />
            <textarea
              placeholder="Write Your Message Here"
              {...register("message", { required: "Message is required" })}
              className="bg-transparent flex-1 outline-none w-full text-sm md:text-base"
              name="message"
            />
          </div>
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 py-3 rounded-lg font-semibold flex items-center justify-center"
        >
          <FiSend className="mr-2" /> Send Message
        </motion.button>
      </form>
    </>
  );
}
