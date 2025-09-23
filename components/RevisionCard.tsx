import { motion } from "framer-motion";

interface RevisionCardProps {
  index: number;
  question: string;
}

export default function RevisionCard({ index, question }: RevisionCardProps) {
  return (
    <motion.div
      className="p-4 border rounded-lg bg-white shadow-sm flex gap-3 items-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-blue-600 font-bold">{index + 1}.</span>
      <p className="text-gray-800">{question}</p>
    </motion.div>
  );
}
