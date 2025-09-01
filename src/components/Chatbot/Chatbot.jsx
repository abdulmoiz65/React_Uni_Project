import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import styles from './Chatbot.module.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatData, setChatData] = useState([]);
    const [fuse, setFuse] = useState(null);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        // Load JSON data
        const loadChatData = async () => {
            try {
                const response = await fetch('/src/data/chatbot_data.json');
                const data = await response.json();
                
                const filteredData = data.filter(row => row.question && row.answer);
                setChatData(filteredData);
                
                // Initialize Fuse for fuzzy search with Roman Urdu support
                const fuseOptions = {
                    keys: ['question', 'keywords', 'answer', 'romanUrdu'],
                    threshold: 0.4,
                    includeScore: true,
                    ignoreLocation: true,
                    findAllMatches: true,
                    minMatchCharLength: 2,
                };
                setFuse(new Fuse(filteredData, fuseOptions));
            } catch (error) {
                console.error('Error loading chat data:', error);
            }
        };

        loadChatData();
    }, []);

    useEffect(() => {
        // Scroll to bottom when new messages are added
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const findBestAnswer = (userInput) => {
        if (!fuse || !userInput.trim()) {
            return "I'm sorry, I didn't understand your question. Can you please rephrase it?";
        }

        // Clean and normalize user input
        const cleanInput = userInput.toLowerCase().trim();
        
        // Check for exact keyword matches first
        const exactMatch = chatData.find(item => {
            const keywords = item.keywords.toLowerCase();
            const romanUrdu = item.romanUrdu ? item.romanUrdu.toLowerCase() : '';
            const question = item.question.toLowerCase();
            return keywords.includes(cleanInput) || 
                   question.includes(cleanInput) || 
                   romanUrdu.includes(cleanInput);
        });
        
        if (exactMatch) {
            return addRelevantLinks(exactMatch.answer, userInput);
        }

        const results = fuse.search(userInput);
        
        if (results.length > 0 && results[0].score < 0.6) {
            return addRelevantLinks(results[0].item.answer, userInput);
        }
        
        // Try partial matching for common terms
        const partialMatch = chatData.find(item => {
            const keywords = item.keywords.toLowerCase().split(' ');
            const romanUrduWords = item.romanUrdu ? item.romanUrdu.toLowerCase().split(' ') : [];
            const inputWords = cleanInput.split(' ');
            return inputWords.some(word => 
                word.length > 2 && (
                    keywords.some(keyword => keyword.includes(word)) ||
                    romanUrduWords.some(urduWord => urduWord.includes(word))
                )
            );
        });
        
        if (partialMatch) {
            return addRelevantLinks(partialMatch.answer, userInput);
        }

        // Fallback responses for common greetings
        if (cleanInput.includes('hello') || cleanInput.includes('hi') || cleanInput.includes('hey') || 
            cleanInput.includes('salam') || cleanInput.includes('assalam') || cleanInput.includes('adab')) {
            return "Hello! Welcome to MAJU University. How can I assist you today? You can ask me about our programs, admissions, campus life, or any other questions about the university.";
        }
        
        if (cleanInput.includes('thank') || cleanInput.includes('thanks') || 
            cleanInput.includes('shukriya') || cleanInput.includes('dhanyawad')) {
            return "You're welcome! Is there anything else I can help you with regarding MAJU University?";
        }

        if (cleanInput.includes('bye') || cleanInput.includes('goodbye') || 
            cleanInput.includes('khuda hafiz') || cleanInput.includes('allah hafiz')) {
            return "Thank you for your interest in MAJU University! Feel free to ask if you have any other questions. Have a great day!";
        }

        // Enhanced fallback with suggestions
        return `I couldn't find specific information about "${userInput}". Here are some topics I can help you with:
        
        📚 **Academic Programs** - What programs do you offer?
        🎓 **Admissions** - Tell me about the admission process
        💰 **Tuition & Financial Aid** - What are the tuition fees?
        🏫 **Campus Life** - What is campus life like?
        🏢 **Facilities** - What facilities are available?
        📞 **Contact** - How do I contact admissions?
        
        **Roman Urdu Examples:**
        • Programs kya hain?
        • Admission kaise le?
        • Fee kitni hai?
        • Campus life kaisa hai?
        
        Please try asking about any of these topics!`;
    };

    const addRelevantLinks = (answer, userInput) => {
        const lowerInput = userInput.toLowerCase();
        let enhancedAnswer = answer;
        
        // Add relevant links based on the topic
        if (lowerInput.includes('admission') || lowerInput.includes('apply')) {
            enhancedAnswer += '\n\n🔗 **Quick Links:** <a href="https://maju.edu.pk/admissions" target="_blank">Apply Now</a> | <a href="https://maju.edu.pk/admission-requirements" target="_blank">View Requirements</a> | <a href="https://maju.edu.pk/application-status" target="_blank">Check Status</a>';
        }
        
        if (lowerInput.includes('program') || lowerInput.includes('course') || lowerInput.includes('degree')) {
            enhancedAnswer += '\n\n🔗 **Explore More:** <a href="https://maju.edu.pk/programs" target="_blank">Browse All Programs</a> | <a href="https://maju.edu.pk/course-catalog" target="_blank">Course Catalog</a> | <a href="https://maju.edu.pk/faculty" target="_blank">Meet Faculty</a>';
        }
        
        if (lowerInput.includes('scholarship') || lowerInput.includes('financial aid')) {
            enhancedAnswer += '\n\n🔗 **Financial Help:** <a href="https://maju.edu.pk/scholarships" target="_blank">Apply for Scholarships</a> | <a href="https://maju.edu.pk/financial-aid" target="_blank">Financial Aid Office</a> | <a href="https://maju.edu.pk/payment-plans" target="_blank">Payment Plans</a>';
        }
        
        if (lowerInput.includes('tuition') || lowerInput.includes('fee')) {
            enhancedAnswer += '\n\n🔗 **Fee Information:** <a href="https://maju.edu.pk/tuition" target="_blank">Fee Structure</a> | <a href="https://maju.edu.pk/payment" target="_blank">Payment Options</a> | <a href="https://maju.edu.pk/calculator" target="_blank">Cost Calculator</a>';
        }
        
        if (lowerInput.includes('campus') || lowerInput.includes('visit') || lowerInput.includes('tour')) {
            enhancedAnswer += '\n\n🔗 **Campus Experience:** <a href="https://maju.edu.pk/campus-tour" target="_blank">Schedule Campus Tour</a> | <a href="https://maju.edu.pk/virtual-tour" target="_blank">Virtual Tour</a> | <a href="https://maju.edu.pk/campus-map" target="_blank">Campus Map</a>';
        }
        
        if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
            enhancedAnswer += '\n\n🔗 **Get in Touch:** <a href="https://maju.edu.pk/contact" target="_blank">Contact Directory</a> | <a href="mailto:info@maju.edu.pk">Email Us</a> | <a href="https://maju.edu.pk/chat" target="_blank">Live Chat</a>';
        }
        
        if (lowerInput.includes('housing') || lowerInput.includes('dormitor') || lowerInput.includes('residence')) {
            enhancedAnswer += '\n\n🔗 **Housing Info:** <a href="https://maju.edu.pk/housing" target="_blank">Housing Options</a> | <a href="https://maju.edu.pk/housing-application" target="_blank">Apply for Housing</a> | <a href="https://maju.edu.pk/residence-life" target="_blank">Residence Life</a>';
        }
        
        if (lowerInput.includes('hostel') || lowerInput.includes('hostel hai')) {
            enhancedAnswer += '\n\n🔗 **Housing Info:** <a href="https://maju.edu.pk/housing" target="_blank">Housing Options</a> | <a href="https://maju.edu.pk/housing-application" target="_blank">Apply for Housing</a> | <a href="https://maju.edu.pk/residence-life" target="_blank">Residence Life</a>';
        }
        
        if (lowerInput.includes('sports') || lowerInput.includes('athletic') || lowerInput.includes('recreation')) {
            enhancedAnswer += '\n\n🔗 **Athletics:** <a href="https://maju.edu.pk/athletics" target="_blank">Sports Teams</a> | <a href="https://maju.edu.pk/recreation" target="_blank">Recreation Center</a> | <a href="https://maju.edu.pk/intramurals" target="_blank">Intramural Sports</a>';
        }
        
        if (lowerInput.includes('library') || lowerInput.includes('library kaisa hai')) {
            enhancedAnswer += '\n\n🔗 **Library Resources:** <a href="https://maju.edu.pk/library" target="_blank">Library Catalog</a> | <a href="https://maju.edu.pk/digital-resources" target="_blank">Digital Resources</a> | <a href="https://maju.edu.pk/study-spaces" target="_blank">Book Study Space</a>';
        }
        
        if (lowerInput.includes('career') || lowerInput.includes('job') || lowerInput.includes('placement')) {
            enhancedAnswer += '\n\n🔗 **Career Support:** <a href="https://maju.edu.pk/career-services" target="_blank">Career Services</a> | <a href="https://maju.edu.pk/job-portal" target="_blank">Job Portal</a> | <a href="https://maju.edu.pk/internships" target="_blank">Find Internships</a>';
        }
        
        return enhancedAnswer;
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setInputValue('');
        setIsLoading(true);

        // Simulate thinking time with typing animation
        setTimeout(() => {
            const botResponse = findBestAnswer(userMessage);
            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
            setIsLoading(false);
        }, 2000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const renderInitialMessage = () => (
        <div className={styles.initialMessage}>
            Hi! This is MAJU University's GPT AI and it's here to help you with anything you might need to know about MAJU University,{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>its programs</a>, application process, student experience and more.{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>This chatbot is highly intelligent</a>, so don't hesitate to ask questions in{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>any language you like</a>.{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>Here</a> are a few examples to get you started:
            <ul className={`${styles.messagesList} mt-2 mb-2`}>
                <li>What programs do you recommend if I'm interested in...</li>
                <li>What are the <a href="#" onClick={(e) => e.preventDefault()}>admissions</a> requirements to join MAJU University?</li>
                <li>Are there any <a href="#" onClick={(e) => e.preventDefault()}>financial aid</a> options at MAJU University?</li>
                <li>What is the campus experience like?</li>
            </ul>
            How can I assist you?
        </div>
    );

    const renderTypingIndicator = () => (
        <div className={`${styles.message} ${styles.botMessage}`}>
            <strong>MAJU Bot: </strong>
            <div className={styles.typingIndicator}>
                <span>Typing</span>
                <div className={styles.typingDots}>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                    <div className={styles.typingDot}></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`container-fluid ${styles.chatbot} py-4`}>
            <h1 className={`fw-bold ${styles.title} mb-4`}>MAJU UNIVERSITY - AI CHAT</h1>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                    MAJU UNIVERSITY CHAT
                </div>
                <div className={styles.chatBody} ref={chatBodyRef}>
                    {messages.length === 0 ? (
                        renderInitialMessage()
                    ) : (
                        <>
                            {messages.map((message, index) => (
                                <div key={index} className={`${styles.message} ${
                                    message.type === 'user' ? styles.userMessage : styles.botMessage
                                }`}>
                                    <strong>{message.type === 'user' ? 'You: ' : 'MAJU Bot: '}</strong>
                                    <div 
                                        className={message.type === 'bot' ? styles.botResponse : ''}
                                        dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }}
                                    />
                                </div>
                            ))}
                            {isLoading && (
                                renderTypingIndicator()
                            )}
                        </>
                    )}
                </div>
                <div className={`${styles.chatFooter} d-flex align-items-center`}>
                    <input 
                        type="text" 
                        className={`form-control me-2 ${styles.messageInput}`}
                        placeholder="Write your question here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button 
                        className={`btn fw-bold px-4 ${styles.sendButton}`}
                        type="button"
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;