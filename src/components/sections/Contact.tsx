'use client';

import React, { useState } from 'react';
import { personalInfo } from '@/lib/data';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission (replace with actual form handling)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and interesting projects. 
              Let&apos;s discuss how we can work together!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {/* Email */}
                <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-400 text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-blue-400 hover:underline"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Phone */}
                {personalInfo.phone && (
                  <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-green-400 text-xl">📞</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Phone</h4>
                        <a 
                          href={`tel:${personalInfo.phone}`}
                          className="text-blue-400 hover:underline"
                        >
                          {personalInfo.phone}
                        </a>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Location */}
                {personalInfo.location && (
                  <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-purple-400 text-xl">📍</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Location</h4>
                        <p className="text-gray-300">{personalInfo.location}</p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-semibold text-white mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  {personalInfo.socialLinks.github && (
                    <a
                      href={personalInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-700/50 text-white rounded-full flex items-center justify-center hover:bg-gray-600/50 transition-colors border border-gray-600"
                    >
                      GH
                    </a>
                  )}
                  {personalInfo.socialLinks.linkedin && (
                    <a
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600/50 text-white rounded-full flex items-center justify-center hover:bg-blue-600/70 transition-colors border border-blue-500"
                    >
                      IN
                    </a>
                  )}
                  {personalInfo.socialLinks.twitter && (
                    <a
                      href={personalInfo.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-400/50 text-white rounded-full flex items-center justify-center hover:bg-blue-400/70 transition-colors border border-blue-400"
                    >
                      TW
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">
                Send a Message
              </h3>
              
              <Card className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-600 rounded-md bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-600 rounded-md bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-600 rounded-md bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your message..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 text-green-700 rounded-md">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-md">
                      Sorry, there was an error sending your message. Please try again.
                    </div>
                  )}
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
