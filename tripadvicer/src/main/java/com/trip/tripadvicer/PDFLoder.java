package com.trip.tripadvicer;

import org.slf4j.ILoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.pdf.ParagraphPdfDocumentReader;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public class PDFLoder implements CommandLineRunner {

    private final VectorStore vectorStore;

    public PDFLoder(VectorStore vectorStore){
        this.vectorStore = vectorStore;
    }

    @Value("classpath:/files/details.pdf")
    private Resource marketPDF;

    @Override
    public void run(String... args) {

        // Replace ParagraphPdfDocumentReader with PagePdfDocumentReader
        PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(marketPDF);

       // var pdfReader = new ParagraphPdfDocumentReader(marketPDF);
        TextSplitter textSplitter = new TokenTextSplitter();
        vectorStore.accept(textSplitter.apply(pdfReader.get()));
        System.out.println("loaded file in memory");
    }
}
