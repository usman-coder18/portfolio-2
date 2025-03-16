'use client'; 
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Typewriter } from 'react-simple-typewriter';
const MotionComponent = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
  ssr: false,
});
import {
  FiMail, FiUser, FiMessageSquare, FiSend, FiX, FiGithub, FiLinkedin,
  FiCode, FiServer, FiDatabase, FiSmartphone, FiChevronUp,
  FiVoicemail, FiMessageCircle, FiTerminal,FiDownload
} from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaAws, FaWhatsapp, FaLinode } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiExpress, SiHtml5,SiSocketdotio } from 'react-icons/si';
import Contact from './contact';

const projects = [
  {
    title: "Number Guess Game",
    description: "A number guess game involves guessing a randomly generated number within a range.",
    tech: [FaReact, SiNextdotjs, FaNodeJs],
    image: "/Screenshot 2025-01-14 191556.png",
    hrefs: ["https://number-guess-number.vercel.app/"]
  },
  {
    title: "Todo List",
    description: "A to-do list is a simple tool to organize tasks by adding, editing, prioritizing, and marking them as complete",
    tech: [SiNextdotjs],
    image: "Screenshot 2025-01-14 174543.png",
    hrefs: ["https://todo-list-phi-indol-53.vercel.app/"]
  },
  {
    title: "Chatter",
    description: "A real-time chat application built with MERN stack and Socket.io",
    tech: [FaReact ,SiSocketdotio ,SiMongodb , SiExpress],
    image: "/Screenshot 2025-03-12 201620.png",
    hrefs: ["https://chat-app-p.up.railway.app/"]
  },
  {
    title: "Bag Shop",
    description: "A modern e-commerce platform for stylish and durable bags, offering a seamless shopping experience with secure checkout.",
    tech: [FaReact, SiMongodb, SiExpress],
    image: "/Screenshot 2025-02-13 040525.png",
    hrefs: ["http://scatch-production.up.railway.app/"]
  },
  {
    title: "Quick Thoughts",
    description: "A sleek and minimal note-taking app that allows users to jot down ideas instantly and organize them efficiently.",
    tech: [FaReact, SiMongodb, SiExpress],
    image: "/Screenshot 2025-02-10 233726.png",
    hrefs: ["https://quickthoughts-production.up.railway.app/"]
  },
  {
    title: "Car-Hub",
    description: "A Next.js 15 car catalog app that fetches and filters cars from an API, using TypeScript, Tailwind CSS, and server components. ",
    tech: [SiNextdotjs,SiTypescript,SiTailwindcss],
    image: "/Screenshot 2025-03-09 175117.png",
    hrefs: ["https://car-hub-five-ecru.vercel.app/"]
  },
];

const PortfolioPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const skills = [FaReact, SiNextdotjs, FaNodeJs, SiTailwindcss, SiTypescript, SiMongodb, SiExpress, SiHtml5];
  // const [chatmessages, setChatMessages] = useState([
  //   { text: "How can I help you?", isBot: true }
  // ]);
  // const onSubmit = async (data) => {
  //   try {
  //     await axios.post('/api/contact', data);
  //     alert('Message sent successfully!');
  //   } catch (error) {
  //     alert('Error sending message');
  //   }
  // };
 
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

   
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/api/chat2', { message: inputMessage });

      if (response?.data?.response) {
        setMessages(prev => [...prev, { text: response.data.response, isBot: true }]);
      } else {
        setMessages(prev => [...prev, { text: "Sorry, I couldn't understand that.", isBot: true }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Error contacting chatbot.", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
       <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 text-center"
      >
     
        <h1 className="text-2xl md:text-5xl font-bold mb-4">
        <Typewriter 
      words={['Muhammad Usman']}
      loop={false}
      cursor
      cursorStyle="|"
      typeSpeed={100}
      deleteSpeed={50}
    />
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">MERN Stack Developer</p>
        <div className="flex justify-center gap-4 mb-4">
          <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/usman-coder18">
            <FiGithub className="text-3xl" />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="https://www.linkedin.com/in/muhammad-usman-ab8b7022a/">
            <FiLinkedin className="text-3xl" />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="mailto:usmanrafique078@gmail.com">
            <FiMail className="text-3xl" />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="https://wa.me/+92336605624">
            <FaWhatsapp className="text-3xl" />
          </motion.a>
        </div>
        <motion.a
          href="/api/resume"
          download="usman-resume.pdf"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-fit mx-auto"
        >
          <FiDownload className="text-xl" /> Download Resume
        </motion.a>
      </motion.section>
      <section className="py-10 px-4 md:py-16 md:px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-black-900 rounded-lg transform rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
            <img
              src="WhatsApp Image 2025-02-10 at 9.32.41 PM.jpeg"
              alt="Usman"
              className="relative z-10 rounded-lg w-full h-48 md:h-64 object-scale-down transform group-hover:-translate-y-2 transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="text-gray-300">
              Passionate MERN-stack developer with 6-months of experience in creating modern web applications.
              Specialized in MERN stack development with a strong focus on responsive design and clean code architecture.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <FiCode className="text-blue-400 text-xl" />
                <span>Web Development</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiSmartphone className="text-blue-400 text-xl" />
                <span>Responsive Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaLinode className="text-blue-400 text-xl" />
                <span>Node.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiDatabase className="text-blue-400 text-xl" />
                <span>MongoDB</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 px-4 md:py-16 md:px-6 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {skills.map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.0, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.0, rotate: 5, boxShadow: "0px 0px 20px rgba(0, 153, 255, 0.7)" }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center p-6 bg-gray-700 rounded-xl shadow-lg cursor-pointer transition-transform"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Icon className="text-5xl text-blue-400 transition-colors duration-300 hover:text-blue-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-10 px-4 md:py-16 md:px-6 bg-gray-800">
  <h2 className="text-3xl font-bold text-center mb-12 text-white">Projects</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
    {projects.map((project, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.15,
          type: "spring",
          stiffness: 80,
          damping: 12,
        }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03, rotate: 0.5 }}
        className="bg-gray-700 rounded-lg overflow-hidden shadow-xl cursor-pointer transition-transform"
      >
       <motion.img
  src={project.image}
  alt={project.title}
  className="w-full h-32 md:h-48 object-cover"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.1, ease: "easeOut" }} 
/>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {project.hrefs && project.hrefs.length > 0 ? (
              project.hrefs.map((link, linkIndex) => (
                <motion.a
                  key={linkIndex}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(0, 153, 255, 0.8)" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                >
                  Visit 
                </motion.a>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No link available</span>
            )}
          </div>

          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>

          <div className="flex gap-3">
            {project.tech.map((Icon, techIndex) => (
              <motion.div
                key={techIndex}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
              >
                <Icon className="text-2xl text-blue-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      <section className="py-10 px-4 md:py-16 md:px-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2">Name</label>
            <div className="flex items-center bg-gray-700 rounded-lg p-3">
              <FiUser className="mr-2" />
              <input
                placeholder="Name"
                {...register('name', { required: true })}
                className="bg-transparent flex-1 outline-none w-full text-sm md:text-base"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <div className="flex items-center bg-gray-700 rounded-lg p-3">
              <FiMail className="mr-2" />
              <input
                placeholder="Email"
                {...register('email', { required: true })}
                className="bg-transparent flex-1 outline-none w-full text-sm md:text-base"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Your Message</label>
            <div className="flex items-center bg-gray-700 rounded-lg p-3">
              <FiMessageSquare className="mr-2" />
              <input
                placeholder="Write Your Message Here"
                {...register('message', { required: true })}
                className="bg-transparent flex-1 outline-none w-full text-sm md:text-base"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-lg font-semibold flex items-center justify-center"
          >
            <FiSend className="mr-2" /> Send Message
          </motion.button>
        </form> */}
        <Contact/>
      </section>

      <div className="fixed bottom-6 right-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-blue-600 p-4 rounded-full shadow-lg"
        >
          {isChatOpen ? <FiX /> : <FiMessageSquare />}
        </motion.button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute bottom-20 right-0 w-80 bg-gray-800 rounded-lg shadow-xl h-96 flex flex-col"
            >
              <div className="p-4 bg-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold">Chatbot</h3>
                <FiX className="cursor-pointer" onClick={() => setIsChatOpen(false)} />
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-3 rounded-lg max-w-xs ${
        msg.isBot ? 'bg-blue-500 self-start' : 'bg-gray-600 self-end'
      }`}
    >
      {msg.text}
    </div>
  ))}
  {loading && <div className="text-gray-400">Bot is typing...</div>}
  <div ref={chatEndRef}></div>
</div>

              <div className="p-3 bg-gray-700 flex">
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none text-white"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <motion.button whileTap={{ scale: 0.9 }} onClick={sendMessage}>
                  <FiSend className="text-xl text-blue-400" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioPage;