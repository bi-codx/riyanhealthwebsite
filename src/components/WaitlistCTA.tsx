/* RIYAN HEALTH LANDING 5/src/components/WaitlistCTA.tsx */
import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export function WaitlistCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Thank you! You\'ve been added to our waitlist.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };


}
