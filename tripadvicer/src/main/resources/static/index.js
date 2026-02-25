 // ── FAQ knowledge base ──
        const FAQ = [
          {
            tag: "Business Hours",
            keywords: ["hours", "open", "business", "working", "schedule", "time"],
            answer: "Our business hours are <strong>Monday – Friday, 9 AM to 6 PM (CET)</strong>. We're closed on weekends and public holidays. You can still submit a ticket outside these hours and we'll get back to you the next business day.",
            card: { label: "📅 Schedule", lines: ["Mon – Fri: 9 AM – 6 PM CET", "Sat – Sun: Closed", "Public Holidays: Closed"] }
          },
          {
            tag: "Password Reset",
            keywords: ["password", "reset", "forgot", "login", "sign in", "access"],
            answer: "To reset your password, click <strong>\"Forgot Password\"</strong> on the login page and enter your email address. You'll receive a reset link within 5 minutes. If it doesn't arrive, check your spam folder or contact support.",
            card: { label: "🔐 Steps", lines: ["1. Go to the login page", "2. Click Forgot Password", "3. Enter your email address", "4. Check your inbox (within 5 min)"] }
          },
          {
            tag: "Refund Policy",
            keywords: ["refund", "return", "money back", "cancel", "cancellation"],
            answer: "We offer a <strong>30-day money-back guarantee</strong> on all purchases. To request a refund, go to your account settings → Orders → Request Refund. Refunds are processed within 5–7 business days to your original payment method.",
            card: { label: "💳 Refund Info", lines: ["Guarantee: 30-day money-back", "Path: Settings → Orders → Refund", "Processing: 5–7 business days"] }
          },
          {
            tag: "Contact & Support",
            keywords: ["contact", "support", "help", "reach", "email", "phone", "ticket"],
            answer: "You can reach our support team through several channels:<br>📧 <strong>Email:</strong> support@yourbrand.com<br>💬 <strong>Live chat:</strong> Available Mon–Fri, 9 AM–6 PM<br>🎟️ <strong>Ticket:</strong> Submit via the Help Center",
            card: { label: "📞 Channels", lines: ["📧 support@yourbrand.com", "💬 Live chat (Mon–Fri, 9–18)", "🎟️ Help Center ticket"] }
          },
          {
            tag: "Pricing",
            keywords: ["price", "pricing", "cost", "plan", "subscription", "fee"],
            answer: "We offer three pricing plans — <strong>Free</strong>, <strong>Pro (€12/mo)</strong>, and <strong>Enterprise</strong> (custom). All plans include a 14-day free trial.",
            card: { label: "💰 Plans", lines: ["Free – up to 3 projects", "Pro – €12/mo, unlimited + priority", "Enterprise – custom pricing"] }
          },
          {
            tag: "Shipping",
            keywords: ["shipping", "delivery", "ship", "deliver", "track"],
            answer: "Standard shipping takes <strong>3–5 business days</strong> within Europe. Express shipping (1–2 days) is available at checkout. Once shipped, you'll receive a tracking number via email.",
            card: { label: "🚚 Delivery", lines: ["Standard: 3–5 business days", "Express: 1–2 days (extra fee)", "Tracking number sent via email"] }
          },
          {
            tag: "Account Deletion",
            keywords: ["account", "delete", "close", "deactivate", "remove"],
            answer: "To delete your account, go to <strong>Settings → Privacy → Delete Account</strong>. This action is permanent. You can also pause your account to keep your data intact.",
            card: { label: "⚠️ Account", lines: ["Path: Settings → Privacy → Delete", "Action is permanent & irreversible", "Alternative: Pause your account"] }
          },
          {
            tag: "Privacy & Data",
            keywords: ["privacy", "data", "gdpr", "personal", "information"],
            answer: "We are fully <strong>GDPR compliant</strong>. We never sell your personal data. You can request a data export or deletion at any time from your account settings.",
            card: { label: "🔒 Privacy", lines: ["Fully GDPR compliant", "Data never sold to 3rd parties", "Export/delete via account settings"] }
          }
        ];

        const fallbackAnswers = [
          "That's a great question! Unfortunately I don't have a specific answer for that in my FAQ database yet. Please <strong>contact our support team</strong> at support@yourbrand.com and they'll be happy to help.",
          "I'm not sure about that one! For detailed assistance, please reach out to our support team via live chat or email. They typically respond within 2 hours on business days.",
          "Hmm, I don't have an answer for that yet. Could you rephrase your question, or try asking about topics like <em>pricing, refunds, support, or account settings</em>?"
        ];

        function findFAQ(query) {
          const q = query.toLowerCase();
          for (const item of FAQ) {
            if (item.keywords.some(k => q.includes(k))) return item;
          }
          return { answer: fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)], card: null, tag: null };
        }

        const chatWindow = document.getElementById("chat-window");
        const input = document.getElementById("user-input");

        // ── Ripple effect ──
        document.getElementById("send-btn").addEventListener("click", function(e) {
          const btn = this;
          const circle = document.createElement("span");
          const diameter = Math.max(btn.clientWidth, btn.clientHeight);
          circle.style.width = circle.style.height = diameter + "px";
          circle.style.left = (e.clientX - btn.getBoundingClientRect().left - diameter / 2) + "px";
          circle.style.top  = (e.clientY - btn.getBoundingClientRect().top  - diameter / 2) + "px";
          circle.classList.add("ripple");
          btn.querySelector(".ripple")?.remove();
          btn.appendChild(circle);
          btn.classList.remove("btn-flash");
          void btn.offsetWidth; // reflow
          btn.classList.add("btn-flash");
        });

        // ── Toast ──
        function showToast(msg) {
          const toast = document.getElementById("toast");
          toast.textContent = msg;
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2000);
        }

        // ── Build result card HTML ──
        function buildCard(card) {
          if (!card) return "";
          const lines = card.lines.map(l => `<div style="padding:2px 0;color:#c5d5f0;">• ${l}</div>`).join("");
          return `<div class="result-card"><div class="card-tag">${card.label}</div>${lines}</div>`;
        }

        // ── Copy button ──
        function buildCopyBtn(text) {
          return `<button class="copy-btn" onclick="copyAnswer(this, \`${text.replace(/`/g,'\\`')}\`)">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
            Copy
          </button>`;
        }

        function copyAnswer(btn, text) {
          const plain = text.replace(/<[^>]+>/g, "").replace(/\n/g," ");
          navigator.clipboard.writeText(plain).then(() => {
            btn.classList.add("copied");
            btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 10-10-1.4-1.4z"/></svg> Copied!`;
            showToast("✅ Answer copied to clipboard!");
            setTimeout(() => {
              btn.classList.remove("copied");
              btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> Copy`;
            }, 2500);
          });
        }

        function appendMessage(role, html) {
          const msg = document.createElement("div");
          msg.className = `msg ${role}`;
          const avatar = document.createElement("div");
          avatar.className = "avatar";
          avatar.textContent = role === "bot" ? "🤖" : "U";
          const bubble = document.createElement("div");
          bubble.className = "bubble";
          bubble.innerHTML = html;
          msg.appendChild(avatar);
          msg.appendChild(bubble);
          chatWindow.appendChild(msg);
          chatWindow.scrollTop = chatWindow.scrollHeight;
          return { msg, bubble };
        }

        function showTyping() {
          const msg = document.createElement("div");
          msg.className = "msg bot";
          msg.id = "typing";
          msg.innerHTML = `<div class="avatar">🤖</div><div class="bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
          chatWindow.appendChild(msg);
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        function removeTyping() {
          const t = document.getElementById("typing");
          if (t) t.remove();
        }

        // ── Typewriter effect ──
        function typewriterHTML(bubble, fullHTML, card, rawText, sourceNote = "") {
          // Strip HTML tags to get plain text for typewriting
          const tmp = document.createElement("div");
          tmp.innerHTML = fullHTML;
          const plain = tmp.textContent;

          bubble.innerHTML = "";
          const textNode = document.createElement("span");
          const cursor = document.createElement("span");
          cursor.className = "cursor";
          bubble.appendChild(textNode);
          bubble.appendChild(cursor);

          let i = 0;
          const speed = Math.max(18, Math.min(38, 1200 / plain.length));
          const interval = setInterval(() => {
            textNode.textContent = plain.slice(0, ++i);
            chatWindow.scrollTop = chatWindow.scrollHeight;
            if (i >= plain.length) {
              clearInterval(interval);
              cursor.remove();
              // Replace with full rich HTML
              bubble.innerHTML = fullHTML + buildCard(card) + buildCopyBtn(rawText) + sourceNote;
              chatWindow.scrollTop = chatWindow.scrollHeight;
            }
          }, speed);
        }

        // ── HTTP Client — POST to /api/ ──
        async function callApi(question) {
          const response = await fetch("/chat/" + question , {
            method: "GET"
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response;
          // Expected response shape: { answer: "...", card?: { label, lines[] }, tag?: "..." }
          return data;
        }

        async function sendMessage() {
          const text = input.value.trim();
          if (!text) return;

          appendMessage("user", text);
          input.value = "";
          input.style.height = "auto";
          document.getElementById("suggestions").style.display = "none";

          showTyping();

          let result;
          try {
            // ── Call real API endpoint ──
            result = await callApi(text);
          } catch (err) {
            // ── Graceful fallback to local FAQ if API is unavailable ──
            console.warn("[FAQ] /api/ unreachable, using local fallback:", err.message);
            result = findFAQ(text);
            result._source = "local";
          }

          removeTyping();

          // Small badge if served from local fallback
          const sourceNote = result._source === "local"
            ? `<div style="font-size:0.68rem;color:var(--text-muted);margin-top:8px;font-family:'JetBrains Mono',monospace;">⚡ local fallback — /api/ unreachable</div>`
            : `<div style="font-size:0.68rem;color:#22c55e88;margin-top:8px;font-family:'JetBrains Mono',monospace;">✓ served from /api/</div>`;

          const { bubble } = appendMessage("bot", "");
          typewriterHTML(bubble, result.answer, result.card || null, result.answer, sourceNote);
        }

        function sendSuggestion(btn) {
          input.value = btn.textContent;
          sendMessage();
        }

        // Auto-resize textarea
        input.addEventListener("input", () => {
          input.style.height = "auto";
          input.style.height = Math.min(input.scrollHeight, 140) + "px";
        });

        // Enter to send
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        });