"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactSection = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const contactInfo = {
        name: "Henok Alemu",
        email: "henok.gebresenbet@gmail.com",
        phone: "+251900060965",
        location: "Addis Ababa, Ethiopia"
    };

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <section className="py-20 bg-background relative overflow-hidden" id="contact">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative inline-block">
                        Let's <span className="text-primary">Collaborate</span>
                        <motion.div
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "60%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg">
                        Ready to bring your vision to life? Reach out and let's discuss your next project.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-card-bg/50 backdrop-blur-xl border border-card-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <h3 className="text-2xl font-bold text-white mb-8">Contact Details</h3>

                        <div className="space-y-8">
                            {/* Name */}
                            <div className="flex items-start space-x-4">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Name</p>
                                    <p className="text-lg text-white font-medium">{contactInfo.name}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <motion.div
                                className="flex items-start space-x-4 cursor-pointer group/item"
                                onClick={() => handleCopy(contactInfo.email, 'email')}
                                whileHover={{ x: 5 }}
                            >
                                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 mb-1">Email</p>
                                        <AnimatePresence>
                                            {copied === 'email' && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-xs text-primary font-medium"
                                                >
                                                    Copied!
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <p className="text-lg text-white font-medium break-all">{contactInfo.email}</p>
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div
                                className="flex items-start space-x-4 cursor-pointer group/item"
                                onClick={() => handleCopy(contactInfo.phone, 'phone')}
                                whileHover={{ x: 5 }}
                            >
                                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                                        <AnimatePresence>
                                            {copied === 'phone' && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-xs text-primary font-medium"
                                                >
                                                    Copied!
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <p className="text-lg text-white font-medium">{contactInfo.phone}</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-800">
                            <p className="text-gray-400 mb-4">Connect on Social Media</p>
                            <div className="flex space-x-4">
                                {['LinkedIn', 'Instagram', 'Twitter', 'YouTube'].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card-border flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <span className="sr-only">{social}</span>
                                        {/* Placeholder icons - replace with actual SVGs if needed */}
                                        <div className="w-5 h-5 bg-current rounded-sm opacity-50" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Call to Action / Message */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded-3xl shadow-2xl">
                            <div className="bg-background rounded-[22px] p-8 md:p-12 h-full">
                                <h3 className="text-3xl font-bold text-white mb-6">
                                    Elevate Your Content
                                </h3>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    Whether you need a high-energy commercial, a cinematic documentary, or engaging social media content, I bring technical expertise and creative vision to every project.
                                </p>
                                <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                                    Let's work together to create visuals that not only look stunning but also tell a compelling story that resonates with your audience.
                                </p>

                                <motion.a
                                    href={`mailto:${contactInfo.email}`}
                                    className="inline-flex items-center justify-center w-full bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="mr-2">Send Me an Email</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
