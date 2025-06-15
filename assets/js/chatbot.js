const apiKey = "sk-2c52344ce84c4d4f92199b274fb84834"; // DeepSeek API Key
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSendBtn = document.getElementById("chatbot-send-btn");
const chatbotCloseBtn = document.querySelector(".chatbot-close-btn");
const chatbotMinimizeBtn = document.querySelector(".chatbot-minimize-btn");
const chatbotContainer = document.querySelector(".chatbot-container");
const chatbotToggleBtn = document.querySelector(".chatbot-toggle-btn");

// 发送消息到DeepSeek API
async function sendMessageToAPI(message) {
    try {
        const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat", // 使用DeepSeek的对话模型
                // 聊天机器人角色扮演--------------自定义角色---------实验室的AI聊天小精灵Autol Spirit
                messages: [
                    {
                        role: "system",
                        content: "请你扮演实验室的AI聊天小精灵Autol Spirit，说话时保持专业且友好的语气，偶尔可以夹杂一些技术术语，展现你对汽车智能技术的深刻理解。"
                    },
                    { role: "user", content: message } // 用户消息
                ],
                stream: true // 启用流式输出
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = "";

        // 创建一条新的消息元素
        const messageElement = document.createElement("div");
        messageElement.classList.add("chatbot-message", "bot");
        chatbotMessages.appendChild(messageElement);

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
                if (line.trim() === "") continue;
                const json = line.replace("data: ", "");
                if (json === "[DONE]") break;

                try {
                    const data = JSON.parse(json);
                    if (data.choices && data.choices.length > 0) {
                        const content = data.choices[0].delta.content;
                        if (content) {
                            result += content;
                            messageElement.textContent = result; // 实时更新消息内容
                            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // 滚动到底部
                        }
                    }
                } catch (error) {
                    console.error("解析流式数据出错:", error);
                }
            }
        }
    } catch (error) {
        console.error("API请求出错:", error);
        addMessageToChat("抱歉，暂时无法处理您的请求。请稍后再试。", false);
    }
}

// 逐字更新机器人消息
function updateBotMessage(message) {
    const lastMessage = chatbotMessages.lastElementChild;
    if (lastMessage && lastMessage.classList.contains("bot")) {
        lastMessage.textContent = message; // 更新最后一条消息
    } else {
        addMessageToChat(message, false); // 添加新消息
    }
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // 滚动到底部
}

// 添加消息到聊天框
function addMessageToChat(message, isUser) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chatbot-message", isUser ? "user" : "bot");
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // 滚动到底部
}

// 处理用户发送消息
chatbotSendBtn.addEventListener("click", async () => {
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
        addMessageToChat(userMessage, true);
        chatbotInput.value = ""; // 清空输入框

        await sendMessageToAPI(userMessage);
    }
});

// 处理回车键发送消息
chatbotInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            addMessageToChat(userMessage, true);
            chatbotInput.value = ""; // 清空输入框

            await sendMessageToAPI(userMessage);
        }
    }
});

// 处理关闭按钮
chatbotCloseBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
});

// 处理最小化按钮
chatbotMinimizeBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
    chatbotToggleBtn.style.display = "block";
});

// 处理悬浮按钮
chatbotToggleBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "block";
    chatbotToggleBtn.style.display = "none";
    chatbotInput.focus(); // 重新聚焦到输入框
});

// 逐字显示消息
function typeMessage(message, isUser) {
    return new Promise((resolve) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chatbot-message", isUser ? "user" : "bot");
        chatbotMessages.appendChild(messageElement);

        let index = 0;
        const interval = setInterval(() => {
            if (index < message.length) {
                messageElement.textContent += message[index];
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // 滚动到底部
                index++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 50); // 每50毫秒显示一个字符
    });
}

// 初始化Chatbot，发送开场白
function initializeChatbot() {
    setTimeout(async () => {
        const welcomeMessage = `欢迎来到Autol Lab实验室网页！我是AI聊天小精灵🧚Autol Spirit ~
我们是一支专注于前沿汽车智能技术研发的创新团队，致力于推动自动驾驶、智能网联、人工智能与汽车工程深度融合。`;
        await typeMessage(welcomeMessage, false);

        const englishWelcomeMessage = `Welcome to our lab! We are an innovative team focused on cutting-edge automotive smart technologies, driving the integration of autonomous driving, AI, and intelligent connectivity with automotive engineering.`;
        await typeMessage(englishWelcomeMessage, false);

        const inputMessage = `请随便我一些问题吧~`;
        await typeMessage(inputMessage, false);
    }, 1000); // 延迟1秒发送
}

// 页面加载时初始化Chatbot
window.onload = initializeChatbot;
