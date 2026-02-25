package com.example.demo;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/")
public class AIController {
    ChatClient client;
    VectorStore vcStore;
    public AIController(ChatClient.Builder builder, MessageChatMemoryAdvisor adv, ChatMemory chatMemory, VectorStore vectorStore){
        this.vcStore = vectorStore;
        // The QuestionAnswerAdvisor is the "bridge" that reads your files
        this.client = builder
                .defaultAdvisors(
                        adv,
                        QuestionAnswerAdvisor.builder(vectorStore)
                                .build()
                )
                .build();
    }
    @GetMapping("/upload")
    public String upload()  {
        String url = "E:\\github\\ai\\SpringAI\\documentextract\\Seligenstadt.pdf";
        Resource resource = new FileSystemResource(url);
        var reader = new TikaDocumentReader(resource);
        var splitter = new TokenTextSplitter();
        List<Document> documents = splitter.apply(reader.get());
        // Add to "Database"
        vcStore.add(documents);
        return "File  is now in my memory!";
    }
    @GetMapping("/ask/{message}")
    public String getData(@PathVariable String message){
            return client.prompt()
                    .user(message)
                    .call()
                    .content();
    }
}
