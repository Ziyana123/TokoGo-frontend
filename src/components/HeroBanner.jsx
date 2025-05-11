import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-green-100 via-emerald-100 to-green-50 rounded-3xl p-6 md:p-12 text-center shadow-xl flex flex-col items-center justify-center overflow-hidden relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Optional decorative circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-300 opacity-20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-400 opacity-20 rounded-full blur-2xl -z-10"></div>

      <motion.h1
        className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-green-800 drop-shadow-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Welcome to TokoGo 🌍
      </motion.h1>

      <motion.p
        className="text-gray-700 mt-4 text-sm sm:text-lg md:text-xl max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Your One-Stop Convenience Store for Travelers and Locals.
        Discover imported treats, travel packs, and local favorites.
      </motion.p>

      <motion.button
        className="mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 text-base sm:text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
      >
        Shop Now
      </motion.button>
    </motion.div>
  );
};

export default HeroBanner;
