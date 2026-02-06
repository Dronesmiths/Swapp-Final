/**
 * SWAPP Chat Agent Logic
 * Powered by Gemini API & Knowledge Base
 */

const GEMINI_API_KEY = "AIzaSyA35jRybn6aEw_MNjsAS9EiV900-uID5R4";
const KB_PATH = "/.agent/knowledge/integrated_kb.md";

class SwappChatAgent {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.kbContent = "";
        this.init();
    }

    async init() {
        this.injectStyles();
        await this.loadKB();
        this.renderWidget();
        this.setupEventListeners();
        this.addMessage("agent", "Hi! I'm the SWAPP Assistant. How can I help you grow your ministry today?");
        this.insertQuickReplies(["How do I create a map?", "What is a Prayer Feed?", "Pricing details"]);
    }

    injectStyles() {
        // Find the correct path to chat.css regardless of page depth
        const scripts = document.getElementsByTagName('script');
        let cssPath = 'css/chat.css';
        for (let script of scripts) {
            if (script.src.includes('chat.js')) {
                cssPath = script.src.replace('js/chat.js', 'css/chat.css');
                break;
            }
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
    }

    async loadKB() {
        try {
            // Try absolute path first
            let response = await fetch(KB_PATH);

            // If absolute fails, try relative paths (useful for local dev)
            if (!response.ok) {
                console.warn("KB fetch (absolute) failed, trying relative paths...");
                response = await fetch('.agent/knowledge/integrated_kb.md');
            }
            if (!response.ok) {
                response = await fetch('../.agent/knowledge/integrated_kb.md');
            }
            if (!response.ok) {
                response = await fetch('../../.agent/knowledge/integrated_kb.md');
            }

            if (response.ok) {
                this.kbContent = await response.text();
                console.log("SWAPP Knowledge Base loaded successfully.");
            } else {
                throw new Error("Integrated KB file not found in standard paths.");
            }
        } catch (error) {
            console.error("Failed to load knowledge base:", error);
            this.kbContent = "SWAPP is a ministry software for outreach, mapping, and CRM.";
        }
    }

    renderWidget() {
        const widgetHTML = `
            <div id="swapp-chat-widget">
                <button id="swapp-chat-trigger" aria-label="Open Chat">
                    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H6l-2 2V4h16v12z"/></svg>
                </button>
                <div id="swapp-chat-window">
                    <div id="swapp-chat-header">
                        <div>
                            <h3>SWAPP Assistant</h3>
                            <div class="status">AI Powered • Online</div>
                        </div>
                        <button id="swapp-chat-close" style="background:none; border:none; color:white; cursor:pointer; font-size:1.5rem; line-height:1;">&times;</button>
                    </div>
                    <div id="swapp-chat-messages"></div>
                    <div id="swapp-chat-input-area">
                        <input type="text" id="swapp-chat-input" placeholder="Ask a question..." autocomplete="off">
                        <button id="swapp-chat-send">
                            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    setupEventListeners() {
        const trigger = document.getElementById('swapp-chat-trigger');
        const closeBtn = document.getElementById('swapp-chat-close');
        const sendBtn = document.getElementById('swapp-chat-send');
        const input = document.getElementById('swapp-chat-input');

        trigger.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());

        sendBtn.addEventListener('click', () => this.handleSendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('swapp-chat-window');
        if (this.isOpen) {
            window.classList.add('open');
            document.getElementById('swapp-chat-input').focus();
        } else {
            window.classList.remove('open');
        }
    }

    addMessage(role, text) {
        const messagesContainer = document.getElementById('swapp-chat-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${role}`;

        // Extract follow-up tags: [FOLLOW_UP: Question Text]
        let cleanText = text;
        const suggestions = [];
        const followUpRegex = /\[FOLLOW_UP:\s*(.*?)\]/gi;
        let match;

        while ((match = followUpRegex.exec(text)) !== null) {
            suggestions.push(match[1]);
        }
        cleanText = text.replace(followUpRegex, '').trim();

        if (role === 'agent') {
            msgDiv.innerHTML = this.formatMarkdown(cleanText);
        } else {
            msgDiv.textContent = cleanText;
        }

        messagesContainer.appendChild(msgDiv);

        if (suggestions.length > 0) {
            this.insertQuickReplies(suggestions);
        }

        // Improved Scrolling: 
        // If it's the agent, scroll to the START of the message so the user can read from the top.
        // If it's the user, scroll to bottom.
        if (role === 'agent') {
            msgDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.playTone(440, 0.1); // Notification sound
        } else {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            this.playTone(660, 0.05); // Subtle send sound
        }

        // Store simple history (role 'agent' maps to 'model' for Gemini)
        this.messages.push({
            role: role === 'agent' ? 'model' : 'user',
            parts: [{ text: text }]
        });
    }

    playTone(freq, duration) {
        try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.connect(gain);
            gain.connect(context.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
            osc.start();
            osc.stop(context.currentTime + duration);
        } catch (e) { /* Audio might be blocked by browser policy until interaction */ }
    }

    formatMarkdown(text) {
        // Simple Markdown-to-HTML formatter
        return text
            .replace(/^### (.*$)/gim, '<h4>$1</h4>') // Headings (as H4)
            .replace(/^## (.*$)/gim, '<h4>$1</h4>')
            .replace(/^# (.*$)/gim, '<h4>$1</h4>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
            .replace(/^\- (.*$)/gim, '<li>$1</li>') // List items
            .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>') // Wrap lists
            .replace(/<\/ul><ul>/gim, '') // Clean up double tags
            .replace(/\n/g, '<br>'); // Newlines to BR
    }

    insertQuickReplies(options) {
        const messagesContainer = document.getElementById('swapp-chat-messages');
        const container = document.createElement('div');
        container.className = 'quick-replies';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = opt;
            btn.onclick = () => {
                const input = document.getElementById('swapp-chat-input');
                input.value = opt;
                this.handleSendMessage();
                container.remove();
            };
            container.appendChild(btn);
        });

        messagesContainer.appendChild(container);
    }

    showTyping() {
        const messagesContainer = document.getElementById('swapp-chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) typingDiv.remove();
    }

    async handleSendMessage() {
        const input = document.getElementById('swapp-chat-input');
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        this.addMessage('user', text);
        this.showTyping();

        try {
            const response = await this.getAIResponse();
            this.hideTyping();
            this.addMessage('agent', response);
        } catch (error) {
            this.hideTyping();
            console.error("Chat Agent Error:", error);

            let errorMsg = "I'm having a little trouble connecting to my central database.";

            // Helpful hint for the developer if the key is leaked
            if (error.message.includes("leaked") || error.message.includes("403")) {
                console.warn("CRITICAL: Your Gemini API Key has likely been blocked or leaked. Check the console for details.");
            }

            if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                errorMsg += `\n\n[DEBUG ERROR]: ${error.message}`;
            }

            this.addMessage('agent', errorMsg);
        }
    }

    async getAIResponse() {
        const context = this.kbContent || "SWAPP is a church outreach app.";

        const systemPrompt = `You are the SWAPP Ministry Assistant. 
Your goal is to provide helpful, professional, and ministry-focused support.

KNOWLEDGE BASE:
${context}

STRICT RESPONSE RULES:
1. DIRECT ANSWER: Start with a clear, concise answer. Use **bold text** for emphasis and bullet points for steps.
2. DYNAMIC BUTTONS: To offer more details, ALWAYS use the [FOLLOW_UP: Question Text] tag at the end of your message.
3. RELEVANCE: If a user says "yes" or "tell me more", explain the previous steps.
4. PERSONALITY: Be encouraging but efficient.`;

        // Prepare context-aware history
        // Gemini requires alternating user/model roles starting with 'user'
        let contents = [...this.messages];

        // Ensure the sequence starts with 'user'
        while (contents.length > 0 && contents[0].role !== 'user') {
            contents.shift();
        }

        // Limit history for performance
        contents = contents.slice(-10);

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

        const payload = {
            contents: contents,
            system_instruction: {
                parts: [{ text: systemPrompt }]
            },
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            // Provide more specific error message based on common API failures
            const message = errData.error?.message || response.statusText;
            if (response.status === 403 && message.includes("leaked")) {
                throw new Error("Your API key has been reported as leaked and blocked by Google.");
            }
            throw new Error(`API ${response.status}: ${message}`);
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Empty AI response");
        }
    }

    // Secret helper for you to run in console if it still fails: swappChat.listModels()
    async listModels() {
        try {
            const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
            const data = await resp.json();
            console.log("Available Models for your key:", data);
            return data;
        } catch (e) {
            console.error("Failed to list models:", e);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.swappChat = new SwappChatAgent();
});
