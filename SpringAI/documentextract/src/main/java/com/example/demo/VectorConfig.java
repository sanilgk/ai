package com.example.demo;

import jakarta.annotation.PreDestroy;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemoryRepository;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

@Configuration
public class VectorConfig {

    private final String vectorStorePath = "E:/github/ai/documentextract/vector_db.json";
    private SimpleVectorStore simpleVectorStore;
    @Bean
    public SimpleVectorStore vectorStore(EmbeddingModel embeddingModel) {
       this.simpleVectorStore = SimpleVectorStore.builder(embeddingModel).build();

        // Load existing data if the file exists
        File file = new File(vectorStorePath);
        if (file.exists()) {
            this.simpleVectorStore.load(file);
        }
        return  this.simpleVectorStore;
    }

    // Optional: Auto-save when the app shuts down
    @PreDestroy
    public void saveStore() {
        if (this.simpleVectorStore != null) {
            this.simpleVectorStore.save(new File(vectorStorePath));
            System.out.println("Vector store saved to disk.");
        }
    }
    @Bean
    public MessageWindowChatMemory chatMemory() {
        // 1. Create the storage repository
        var repository = new InMemoryChatMemoryRepository();

        // 2. Use the Builder to create the memory window
        return MessageWindowChatMemory.builder()
                .chatMemoryRepository(repository) // Link the storage
                .maxMessages(10)                  // Keep the last 10 messages
                .build();
    }
    @Bean
    public MessageChatMemoryAdvisor messageChatMemoryAdvisor(ChatMemory chatMemory) {
        // Using the 2026 Builder pattern
        return MessageChatMemoryAdvisor.builder(chatMemory)// Optional: remember last 10 messages
                .build();
    }

}
