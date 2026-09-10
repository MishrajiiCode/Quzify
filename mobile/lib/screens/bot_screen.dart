import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ChatMessage {
  final String text;
  final bool isUser;
  final DateTime timestamp;

  const ChatMessage({
    required this.text,
    required this.isUser,
    required this.timestamp,
  });
}

class BotScreen extends StatefulWidget {
  const BotScreen({super.key});

  @override
  State<BotScreen> createState() => _BotScreenState();
}

class _BotScreenState extends State<BotScreen> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  final List<ChatMessage> _messages = [
    ChatMessage(
      text: "Hello Learner! 🤖 I'm Quizify AI, your intelligent study coach. Ask me to explain concepts, generate practice questions, or test your memory on any subject!",
      isUser: false,
      timestamp: DateTime.now(),
    ),
  ];

  final List<String> _quickPrompts = [
    "🧪 Quiz me on Science",
    "💻 Explain Binary Trees",
    "📐 Give me a Math problem",
    "🔥 How to increase my streak?",
    "🧠 What is my weakest subject?",
  ];

  void _sendMessage(String text) {
    final trimmed = text.trim();
    if (trimmed.isEmpty) return;

    _textController.clear();
    setState(() {
      _messages.add(ChatMessage(
        text: trimmed,
        isUser: true,
        timestamp: DateTime.now(),
      ));
    });

    _scrollToBottom();

    // AI Simulated Reply
    Future.delayed(const Duration(milliseconds: 600), () {
      if (!mounted) return;
      final reply = _generateBotReply(trimmed);
      setState(() {
        _messages.add(ChatMessage(
          text: reply,
          isUser: false,
          timestamp: DateTime.now(),
        ));
      });
      _scrollToBottom();
    });
  }

  String _generateBotReply(String prompt) {
    final lower = prompt.toLowerCase();
    if (lower.contains('science')) {
      return "Here is a quick science challenge: What is the only metal that is liquid at room temperature?\n\n(Hint: It's Mercury, atomic number 80! 🌡️). Would you like a full science drill?";
    } else if (lower.contains('math')) {
      return "Math challenge: If a car travels at 60 mph for 2 hours and 30 minutes, how far does it travel?\n\nAnswer: 60 × 2.5 = 150 miles! 🚗💨";
    } else if (lower.contains('coding') || lower.contains('binary') || lower.contains('tree')) {
      return "A Binary Search Tree (BST) maintains sorted order: each node has at most two children where left child < parent < right child. This gives O(log n) average search time! 🌲";
    } else if (lower.contains('streak')) {
      return "To protect your streak, complete at least one quick quiz every day before midnight. You also earn +10 bonus coins for every 3-day streak milestone! 🔥";
    } else if (lower.contains('weak')) {
      return "Based on your Weakness Profiler diagnostics, your Mathematics accuracy could use a boost. Head over to the Brain tab to launch a targeted drill session! 🧠";
    } else {
      return "Great inquiry! In Quizify AI, consistent active recall is the most effective way to reinforce long-term memory. Let's conquer another quiz together! 🚀";
    }
  }

  void _scrollToBottom() {
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      appBar: AppBar(
        title: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.smart_toy, color: AppTheme.neonCyan, size: 20),
            SizedBox(width: 8),
            Text('Quizify AI Tutor'),
          ],
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Quick prompts pill list
            SizedBox(
              height: 42,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _quickPrompts.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final prompt = _quickPrompts[index];
                  return GestureDetector(
                    onTap: () => _sendMessage(prompt),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 14, vertical: 8),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(999),
                        color: Colors.white.withOpacity(0.06),
                        border: Border.all(
                          color: AppTheme.neonCyan.withOpacity(0.3),
                        ),
                      ),
                      child: Center(
                        child: Text(
                          prompt,
                          style: const TextStyle(
                            color: AppTheme.textPrimary,
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 10),

            // Chat Messages List
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                physics: const BouncingScrollPhysics(),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  final msg = _messages[index];
                  return _buildMessageBubble(msg);
                },
              ),
            ),

            // Pill Input Bar
            Container(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 95), // Spacing for bottom dock
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 18),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(999),
                        color: Colors.white.withOpacity(0.08),
                        border: Border.all(color: AppTheme.glassBorder),
                      ),
                      child: TextField(
                        controller: _textController,
                        onSubmitted: _sendMessage,
                        style: const TextStyle(color: Colors.white),
                        decoration: const InputDecoration(
                          hintText: 'Ask your AI tutor anything...',
                          hintStyle: TextStyle(color: AppTheme.textMuted),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  GestureDetector(
                    onTap: () => _sendMessage(_textController.text),
                    child: Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: AppTheme.cyanGradient,
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.neonCyan.withOpacity(0.35),
                            blurRadius: 12,
                          ),
                        ],
                      ),
                      child: const Icon(
                        Icons.send_rounded,
                        color: Colors.black,
                        size: 20,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMessageBubble(ChatMessage msg) {
    return Align(
      alignment: msg.isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 6),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.78,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(20),
            topRight: const Radius.circular(20),
            bottomLeft: Radius.circular(msg.isUser ? 20 : 4),
            bottomRight: Radius.circular(msg.isUser ? 4 : 20),
          ),
          border: Border.all(
            color: msg.isUser
                ? AppTheme.neonCyan.withOpacity(0.4)
                : AppTheme.neonPurple.withOpacity(0.4),
          ),
          gradient: LinearGradient(
            colors: msg.isUser
                ? [
                    AppTheme.neonCyan.withOpacity(0.25),
                    AppTheme.neonBlue.withOpacity(0.2),
                  ]
                : [
                    AppTheme.surfaceLight.withOpacity(0.8),
                    Colors.white.withOpacity(0.04),
                  ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Text(
          msg.text,
          style: const TextStyle(
            color: AppTheme.textPrimary,
            fontSize: 14,
            height: 1.4,
          ),
        ),
      ),
    );
  }
}
