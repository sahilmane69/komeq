"use client";

import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import { useEffect, useState } from "react";

type Review = {
     id: number;
     name: string;
     role: string | null;
     content: string;
     rating: number;
     created_at: string;
};

export function ReviewsAndCounter() {
     const [reviews, setReviews] = useState<Review[]>([]);
     const [loading, setLoading] = useState(true);

     // Form State (matching screenshot fields)
     const [newName, setNewName] = useState("");
     const [newEmail, setNewEmail] = useState("");
     const [newContent, setNewContent] = useState("");
     const [rating, setRating] = useState<number | null>(null);
     const [agreed, setAgreed] = useState(false);
     const [submitting, setSubmitting] = useState(false);

     useEffect(() => {
          fetch('/api/reviews')
               .then(res => res.json())
               .then(data => {
                    if (data.reviews) setReviews(data.reviews);
                    setLoading(false);
               })
               .catch(err => {
                    console.error("Failed to fetch reviews:", err);
                    setLoading(false);
               });
     }, []);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!newName.trim() || !newContent.trim() || !rating || !agreed) return;

          setSubmitting(true);
          try {
               const res = await fetch('/api/reviews', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         name: newName,
                         role: "Customer",
                         content: newContent,
                         rating: Math.ceil(rating / 2),
                    })
               });
               const data = await res.json();
               if (data.reviews) {
                    setReviews(data.reviews);
                    setNewName("");
                    setNewEmail("");
                    setNewContent("");
                    setRating(null);
                    setAgreed(false);
               }
          } catch (err) {
               console.error("Error submitting review", err);
          } finally {
               setSubmitting(false);
          }
     };

     return (
          <div className="relative w-full py-24 px-6 md:px-12 z-20 overflow-hidden text-left bg-black border-t border-white/5">
               {/* Background ambient glow matching the theme */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

               <div className="max-w-4xl mx-auto relative z-10 w-full space-y-12">

                    {/* Header */}
                    <div className="text-center space-y-4 mb-4">
                         <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
                              Voices of the <span className="text-transparent bg-clip-text bg-linear-to-br from-red-400 to-red-600">Pioneers</span>
                         </h2>
                    </div>

                    <div className="space-y-6">
                         <div className="bg-[#121212] rounded-[32px] p-8 sm:p-10 flex flex-col space-y-8 w-full shadow-2xl relative z-10 mx-auto max-w-2xl">
                              <div className="space-y-2 mb-2">
                                   <h3 className="text-[28px] font-semibold text-white tracking-tight">Customer Review Form</h3>
                                   <p className="text-[#e0e0e0] text-base leading-relaxed mt-2 pt-2">
                                        We value your feedback. Please take a<br />
                                        moment to review your experience with us.
                                   </p>
                              </div>

                              <form onSubmit={handleSubmit} className="flex flex-col space-y-8 w-full relative z-10">
                                   {/* Name and Email Row */}
                                   <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                                        <div className="relative w-full">
                                             <input
                                                  type="text"
                                                  required
                                                  value={newName}
                                                  onChange={(e) => setNewName(e.target.value)}
                                                  className="w-full bg-transparent border-b border-[#333] px-1 pb-3 pt-6 text-[#e0e0e0] placeholder-[#888] focus:outline-hidden focus:border-[#777] transition-colors peer text-lg"
                                                  placeholder="Your Name"
                                             />
                                        </div>
                                        <div className="relative w-full">
                                             <input
                                                  type="email"
                                                  value={newEmail}
                                                  onChange={(e) => setNewEmail(e.target.value)}
                                                  className="w-full bg-transparent border-b border-[#333] px-1 pb-3 pt-6 text-[#e0e0e0] placeholder-[#888] focus:outline-hidden focus:border-[#777] transition-colors peer text-lg"
                                                  placeholder="Your Email"
                                             />
                                        </div>
                                   </div>

                                   {/* Overall Experience / 1-10 Scale */}
                                   <div className="space-y-4 pt-4 mb-2">
                                        <div className="space-y-1">
                                             <h4 className="text-[#e0e0e0] text-[17px]">Overall Experience</h4>
                                             <p className="text-[#888] text-sm mt-1">Rate your overall experience with us</p>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                             <div className="flex w-full justify-between gap-1 sm:gap-2">
                                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                       <div
                                                            key={num}
                                                            onClick={() => setRating(num)}
                                                            className="flex-1 flex flex-col items-center cursor-pointer group"
                                                       >
                                                            <div className={`text-[17px] mb-4 transition-colors ${(rating ?? 0) >= num ? 'text-white' : 'text-[#e0e0e0] group-hover:text-white'}`}>
                                                                 {num}
                                                            </div>
                                                            <div className={`w-full h-[2px] transition-colors ${(rating ?? 0) >= num ? 'bg-[#999]' : 'bg-[#333] group-hover:bg-[#555]'}`} />
                                                       </div>
                                                  ))}
                                             </div>
                                             <div className="flex justify-between w-full text-[13px] text-[#888] pt-1">
                                                  <span>Poor</span>
                                                  <span>Excellent</span>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Comments Field */}
                                   <div className="space-y-2 pt-4 mb-2">
                                        <input
                                             type="text"
                                             required
                                             value={newContent}
                                             onChange={(e) => setNewContent(e.target.value)}
                                             className="w-full bg-transparent border-b border-[#333] px-1 pb-3 pt-6 text-[#e0e0e0] placeholder-[#888] focus:outline-hidden focus:border-[#777] transition-colors text-lg"
                                             placeholder="Comments"
                                        />
                                        <p className="text-[#888] text-[13px] mt-3">Please provide any additional comments or suggestions</p>
                                   </div>

                                   {/* Checkbox */}
                                   <label className="flex items-start gap-4 cursor-pointer group mt-6">
                                        <div className="relative flex items-center justify-center mt-[3px]">
                                             <input
                                                  type="checkbox"
                                                  className="peer sr-only"
                                                  checked={agreed}
                                                  onChange={(e) => setAgreed(e.target.checked)}
                                             />
                                             <div className={`w-5 h-5 rounded-[4px] border ${agreed ? 'bg-[#333] border-[#444]' : 'border-[#444] group-hover:border-[#666] flex'} items-center justify-center transition-colors bg-[#222]`}>
                                                  {agreed && <Check className="w-3.5 h-3.5 text-white stroke-4" />}
                                             </div>
                                        </div>
                                        <span className="text-[#e0e0e0] text-[17px] leading-snug">
                                             I agree that my review can be published on the<br />website.
                                        </span>
                                   </label>

                                   {/* Submit Button */}
                                   <div className="flex justify-center pt-8 pb-2">
                                        <button
                                             type="submit"
                                             disabled={submitting || !rating || !agreed}
                                             className="bg-white text-black font-semibold text-[16px] px-8 py-3.5 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                             {submitting ? "Submitting..." : "Submit Review"}
                                        </button>
                                   </div>
                              </form>
                         </div>

                         {/* Review List */}
                         <div className="w-full space-y-4 pt-4">
                              {loading ? (
                                   <div className="flex justify-center py-20">
                                        <div className="w-6 h-6 border-2 border-[#ff3333] border-t-transparent rounded-full animate-spin" />
                                   </div>
                              ) : reviews.length === 0 ? (
                                   <div className="py-16 text-center border border-dashed border-white/5 rounded-2xl bg-[#0a0a0a]">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4">
                                             <Star className="w-5 h-5 text-gray-500 opacity-50" />
                                        </div>
                                        <h3 className="text-lg font-medium text-white/80">No Reviews Yet</h3>
                                        <p className="text-sm text-gray-500 mt-1">Be the first to share your experience.</p>
                                   </div>
                              ) : (
                                   <div className="flex flex-col gap-6">
                                        {reviews.map((review, i) => (
                                             <motion.div
                                                  key={review.id}
                                                  initial={{ opacity: 0, y: 10 }}
                                                  whileInView={{ opacity: 1, y: 0 }}
                                                  viewport={{ once: true, margin: "-50px" }}
                                                  transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.1 }}
                                                  className="bg-[#121212] rounded-[32px] p-8 sm:p-10 flex flex-col items-start space-y-6 w-full shadow-2xl relative z-10 mx-auto max-w-2xl border border-white/5"
                                             >
                                                  {/* Star Rating Layout */}
                                                  <div className="flex gap-1.5 -ml-0.5">
                                                       {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                 key={star}
                                                                 className={`w-[18px] h-[18px] ${review.rating >= star ? 'text-[#ff3333] fill-[#ff3333]' : 'text-[#333] fill-[#333]'}`}
                                                            />
                                                       ))}
                                                  </div>

                                                  {/* Review Content */}
                                                  <p className="text-[#888] text-[16px] sm:text-[17px] leading-relaxed italic w-full">
                                                       &quot;{review.content}&quot;
                                                  </p>

                                                  {/* Reviewer Details */}
                                                  <div className="flex flex-col space-y-1.5 w-full pt-2">
                                                       <span className="text-[#e0e0e0] font-medium text-[16px]">{review.name}</span>
                                                       {review.role && (
                                                            <span className="text-[#ff3333] text-[12px] tracking-wider uppercase font-semibold">{review.role}</span>
                                                       )}
                                                  </div>
                                             </motion.div>
                                        ))}
                                   </div>
                              )}
                         </div>
                    </div>
               </div>

               {/* Hidden element to satisfy Turbopack cached HMR graphs */}
               <div className="hidden"><Check /></div>
          </div>
     );
}
