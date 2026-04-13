package com.example.text_to_vector.service.impl;

import com.example.text_to_vector.service.MedicalRecordService;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final VectorStore vectorStore;

    public MedicalRecordServiceImpl(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    @Override
    public void saveToVectorSpace(String patientName, String historyText) {
        Document document = new Document(
                historyText,
                Map.of("patientName", patientName)
        );

        vectorStore.add(List.of(document));
    }

    @Override
    public List<String> findSimilar(String query) {
        SearchRequest request = SearchRequest.builder()
                .query(query)
                .topK(5)
                .similarityThreshold(0.7)
                .build();

        return vectorStore.similaritySearch(request).stream()
                .map(doc -> {
                    Object patientName = doc.getMetadata().get("patientName");
                    return "Пациент: " + patientName + "\nИстория: " + doc.getText();
                })
                .toList();
    }
}