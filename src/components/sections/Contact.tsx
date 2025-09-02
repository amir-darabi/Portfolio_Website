'use client';

import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '@/lib/data';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import '../../styles/fonts.css';
import { Github, Linkedin, Mail } from 'lucide-react';

// Input validation and sanitization utilities
const validateInput = {
  name: (value: string): { isValid: boolean; error?: string } => {
    const trimmed = value.trim();
    if (!trimmed) return { isValid: false, error: 'Name is required' };
    if (trimmed.length < 2) return { isValid: false, error: 'Name must be at least 2 characters' };
    if (trimmed.length > 50) return { isValid: false, error: 'Name must be less than 50 characters' };
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return { isValid: false, error: 'Name contains invalid characters' };
    return { isValid: true };
  },

  email: (value: string): { isValid: boolean; error?: string } => {
    const trimmed = value.trim();
    if (!trimmed) return { isValid: false, error: 'Email is required' };
    if (trimmed.length > 100) return { isValid: false, error: 'Email must be less than 100 characters' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return { isValid: false, error: 'Please enter a valid email address' };
    return { isValid: true };
  },

  message: (value: string): { isValid: boolean; error?: string } => {
    const trimmed = value.trim();
    if (!trimmed) return { isValid: false, error: 'Message is required' };
    if (trimmed.length < 5) return { isValid: false, error: 'Message must be at least 5 characters' };
    if (trimmed.length > 1000) return { isValid: false, error: 'Message must be less than 1000 characters' };
    // Check for potential malicious content patterns
    const suspiciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe\b/gi,
      /<object\b/gi,
      /<embed\b/gi
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(trimmed)) {
        return { isValid: false, error: 'Message contains invalid content' };
      }
    }
    return { isValid: true };
  }
};

// Simple rate limiting (in production, use server-side rate limiting)
const rateLimiter = {
  attempts: new Map<string, { count: number; lastAttempt: number }>(),

  canAttempt(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier);

    if (!userAttempts) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Reset counter if more than 5 minutes have passed
    if (now - userAttempts.lastAttempt > 5 * 60 * 1000) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Allow max 3 attempts per 5 minutes
    if (userAttempts.count >= 3) {
      return false;
    }

    userAttempts.count++;
    userAttempts.lastAttempt = now;
    return true;
  }
};

// HTML sanitization (basic - in production use a library like DOMPurify)
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Animation states
  const [isContactInfoVisible, setIsContactInfoVisible] = useState(false);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);

  // Refs for intersection observer
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === contactInfoRef.current) {
            setIsContactInfoVisible(true);
          }
          if (entry.target === contactFormRef.current) {
            setIsContactFormVisible(true);
          }
        }
      });
    }, observerOptions);

    // Store current refs
    const currentContactInfoRef = contactInfoRef.current;
    const currentContactFormRef = contactFormRef.current;

    if (currentContactInfoRef) observer.observe(currentContactInfoRef);
    if (currentContactFormRef) observer.observe(currentContactFormRef);

    return () => {
      if (currentContactInfoRef) observer.unobserve(currentContactInfoRef);
      if (currentContactFormRef) observer.unobserve(currentContactFormRef);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Clear previous errors for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameValidation = validateInput.name(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    const emailValidation = validateInput.email(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    const messageValidation = validateInput.message(formData.message);
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Rate limiting check
    const userIdentifier = formData.email; // In production, use IP or better identifier
    if (!rateLimiter.canAttempt(userIdentifier)) {
      setErrors({ general: 'Too many attempts. Please try again in 5 minutes.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize inputs before sending
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message)
      };

      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Show the specific error message from the API if available
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again later.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-blue-500 max-w-32"></div>
              <h2 className="text-3xl md:text-4xl goldman-bold mx-6 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500/80 max-w-32"></div>
            </div>
            <p className="text-lg text-gray-300 exo2-regular max-w-2xl mx-auto">
              Let&apos;s discuss how we can work together!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information - Using Card Component */}
            <div
              ref={contactInfoRef}
              className={`relative transition-all duration-1000 ease-out ${isContactInfoVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                }`}
            >
              <h3 className="text-2xl goldman-bold text-blue-600 mb-8 text-center">
                Contact Information
              </h3>

              <Card className="relative p-8 bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/30 hover:shadow-cyan-500/10 transition-all duration-1000 overflow-hidden">
                {/* Multiple Glass Layers for Enhanced Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-blue-500/2 to-purple-500/3 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/2 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-t-3xl"></div>

                <div className="relative z-10 space-y-6">
                  {/* Email */}
                  <div className="group">
                    <div className="flex items-center p-6 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-400/30 transition-all duration-500 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-500/5">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-6 group-hover:shadow-lg group-hover:shadow-cyan-400/40 transition-all duration-500">
                        <span className="text-white text-xl">✉️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white exo2-semibold mb-1 group-hover:text-cyan-100 transition-colors duration-300">Email</h4>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 exo2-regular"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  {personalInfo.phone && (
                    <div className="group">
                      <div className="flex items-center p-6 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-400/30 transition-all duration-500 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-500/5">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-6 group-hover:shadow-lg group-hover:shadow-cyan-400/40 transition-all duration-500">
                          <span className="text-white text-xl">📞</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white exo2-semibold mb-1 group-hover:text-cyan-100 transition-colors duration-300">Phone</h4>
                          <a
                            href={`tel:${personalInfo.phone}`}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 exo2-regular"
                          >
                            {personalInfo.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {personalInfo.location && (
                    <div className="group">
                      <div className="flex items-center p-6 bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-400/30 transition-all duration-500 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-500/5">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-6 group-hover:shadow-lg group-hover:shadow-cyan-400/40 transition-all duration-500">
                          <span className="text-white text-xl">📍</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white exo2-semibold mb-1 group-hover:text-cyan-100 transition-colors duration-300">Location</h4>
                          <p className="text-gray-300 exo2-regular group-hover:text-gray-100 transition-colors duration-300">{personalInfo.location}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="font-semibold text-white exo2-semibold mb-4 text-center">Connect with me</h4>
                    <div className="flex gap-8 justify-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                      {[
                        { icon: Github, href: personalInfo.socialLinks.github, label: "GitHub" },
                        { icon: Linkedin, href: personalInfo.socialLinks.linkedin, label: "LinkedIn" },
                        { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" }
                      ].map(({ icon: IconComponent, href, label }, index) => {
                        const Icon = IconComponent;
                        return (
                          <a
                            key={label}
                            href={href}
                            target={label !== "Email" ? "_blank" : undefined}
                            rel={label !== "Email" ? "noopener noreferrer" : undefined}
                            className="p-3 bg-tranparent shadow-lg shadow-cyan-600/50 rounded-xl text-white hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25 animate-fade-in-up"
                            style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                            aria-label={label}
                          >
                            <Icon size={24} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              </Card>
            </div>

            {/* Contact Form - Using Card Component */}
            <div
              ref={contactFormRef}
              className={`relative transition-all duration-1000 ease-out ${isContactFormVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: isContactFormVisible ? '400ms' : '0ms' }}
            >
              <h3 className="text-2xl goldman-bold text-blue-600 mb-8 text-center">
                Send a Message
              </h3>

              <Card className="relative p-8 bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/30 hover:shadow-cyan-500/10 transition-all duration-1000 overflow-hidden">
                {/* Multiple Glass Layers for Enhanced Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-blue-500/2 to-purple-500/3 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/2 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-t-3xl"></div>
                
                <div className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* General Error Message */}
                    {errors.general && (
                      <div className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-400/30 text-red-300 rounded-xl exo2-regular">
                        {errors.general}
                      </div>
                    )}

                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 exo2-medium">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        className={`w-full px-4 py-3 border rounded-xl bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/40 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 exo2-regular ${errors.name ? 'border-red-400/50 focus:ring-red-500/50' : 'border-white/20'
                          }`}
                        placeholder="Your Name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-400 exo2-light">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 exo2-medium">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className={`w-full px-4 py-3 border rounded-xl bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/40 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 exo2-regular ${errors.email ? 'border-red-400/50 focus:ring-red-500/50' : 'border-white/20'
                          }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-400 exo2-light">{errors.email}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 exo2-medium">
                        Message <span className="text-red-400">*</span>
                        <span className="text-gray-500 text-xs ml-2">({formData.message.length}/1000)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        maxLength={1000}
                        className={`w-full px-4 py-3 border rounded-xl bg-gradient-to-r from-white/5 to-white/2 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/40 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 resize-vertical exo2-regular ${errors.message ? 'border-red-400/50 focus:ring-red-500/50' : 'border-white/20'
                          }`}
                        placeholder="Your message..."
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-400 exo2-light">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button - Using Button Component */}
                    <div className="pt-4 pb-2">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-4"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isSubmitting && (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-cyan-500 rounded-full animate-spin"></div>
                          )}
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </span>
                      </Button>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-400/30 text-green-300 rounded-xl exo2-regular">
                        Thank you! Your message has been sent successfully.
                      </div>
                    )}

                    {submitStatus === 'error' && !errors.general && (
                      <div className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-400/30 text-red-300 rounded-xl exo2-regular">
                        Sorry, there was an error sending your message. Please try again.
                      </div>
                    )}
                  </form>
                </div>

                {/* Bottom highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
