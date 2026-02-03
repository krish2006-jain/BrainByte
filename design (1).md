# Bharat-AI Design Document

## System Overview

Bharat-AI is a unified AI portal that provides civic, health, and education support to Indian citizens through three core services: Sarkari-Dost (civic assistant), Seva-Summary (health and insights), and Vidyarthi-AI (adaptive education). The system leverages cloud-based AI services, OCR technology, and retrieval-augmented generation to process uploaded documents and deliver simplified, localized content in regional Indian languages.

## High-Level Architecture

The system follows a serverless, event-driven architecture with the following layers:

### Presentation Layer
- React.js frontend with Tailwind CSS for responsive UI
- Hosted on AWS Amplify OR Amazon S3 + CloudFront
- Alternative deployment via Vercel

### Application Layer
- Python Flask backend
- AWS Lambda functions for event-driven processing
- Alternative deployment via Render

### AI Processing Layer
- OCR: Amazon Textract OR Tesseract / PaddleOCR
- LLM: Amazon Bedrock (Gemini) OR Google Gemini / OpenAI
- RAG: SentenceTransformers + FAISS
- Translation: Amazon Translate OR AI-based translation for Indian languages

### Storage Layer
- Local storage or Amazon S3
- Two logical buckets: Upload and Processed

### Security Layer
- Amazon Cognito for user authentication
- AWS IAM for service permissions

## Component Breakdown

### Frontend Components

#### User Interface (React.js + Tailwind CSS)
- Language selection interface
- Service selection (Sarkari-Dost, Seva-Summary, Vidyarthi-AI)
- Document upload component
- Results display with simplified summaries
- Visual indicators (color-coded charts)
- Voice playback controls for multi-lingual audio

### Backend Components

#### Flask Application Server
- REST API endpoints for frontend communication
- Request routing to appropriate AI services
- Response formatting and delivery

#### AWS Lambda Functions
- Document upload handler
- OCR trigger and processing
- LLM invocation for text simplification
- Translation service integration
- Response aggregation and delivery

### AI Processing Components

#### OCR Engine
- **Option 1**: Amazon Textract for cloud-based OCR
- **Option 2**: Tesseract / PaddleOCR for local or self-hosted OCR
- Extracts text from uploaded documents (IDs, medical reports, handwritten notes)

#### Large Language Model
- **Option 1**: Amazon Bedrock (Gemini)
- **Option 2**: Google Gemini
- **Option 3**: OpenAI
- Simplifies extracted text into plain language
- Generates step-by-step guidance and checklists
- Creates educational content (summaries, quizzes, concept maps)

#### RAG System (SentenceTransformers + FAISS)
- Stores government guidelines and knowledge base
- Retrieves relevant context for LLM processing
- Enables accurate, up-to-date responses for civic queries

#### Translation Engine
- **Option 1**: Amazon Translate
- **Option 2**: AI-based translation for Indian languages
- Converts simplified content to user's selected regional language
- Implements Human-Centric Localization Engine for meaning simplification

### Storage Components

#### Upload Bucket
- Stores user-uploaded documents
- Temporary storage for processing pipeline

#### Processed Bucket
- Stores OCR results
- Stores simplified and translated outputs
- Maintains processing history

### Security Components

#### Amazon Cognito
- User registration and login
- Session management
- Token-based authentication

#### AWS IAM
- Service-to-service permissions
- Lambda execution roles
- S3 access policies

## Data Flow

### User Authentication Flow
1. User accesses the frontend application
2. User authenticates via Amazon Cognito
3. Cognito issues authentication tokens
4. Frontend stores tokens for API requests

### Document Processing Flow
1. User selects preferred regional language
2. User selects service (Sarkari-Dost, Seva-Summary, or Vidyarthi-AI)
3. User uploads document via frontend
4. Document is stored in Upload bucket
5. Upload event triggers AWS Lambda function
6. Lambda invokes OCR engine (Amazon Textract OR Tesseract/PaddleOCR)
7. Extracted text is passed to LLM with service-specific context
8. LLM processes text and generates simplified output
9. Translation engine converts output to selected language
10. Processed result is stored in Processed bucket
11. Response is returned to frontend
12. Frontend displays simplified summary and next-steps checklist
13. Voice support reads out content in regional language

## AI Processing Flow

### Sarkari-Dost (Civic Assistant) Flow
1. User uploads ID documents (Aadhaar, PAN, Driving License)
2. OCR extracts text and metadata from documents
3. LLM analyzes extracted data for:
   - Missing documents
   - Blurry images
   - Name mismatches
4. RAG system retrieves relevant government guidelines from FAISS
5. LLM generates step-by-step checklist and guidance
6. Translation engine localizes output
7. Frontend displays validation results and guidance

### Seva-Summary (Health & Insights) Flow
1. User uploads medical reports, notices, or business data
2. OCR extracts text and structured data
3. LLM simplifies medical terminology or business metrics
4. For farmers/business users: LLM analyzes market trends, price changes, performance data
5. System generates color-coded charts for visual indicators
6. Translation engine localizes summary
7. Frontend displays plain-language summary with visual charts

### Vidyarthi-AI (Adaptive Education) Flow
1. User uploads handwritten or textbook notes
2. The system uses grade-based adaptation for explanations
3. OCR extracts text from notes
4. LLM processes content with grade-adaptive prompting:
   - Generates summary
   - Creates visual flowcharts and concept maps
   - Generates quizzes (MCQs, fill-in-the-blank)
   - Identifies relevant topics for YouTube recommendations
5. Translation engine localizes educational content
6. Frontend displays summaries, visuals, quizzes, and video links

### RAG-Enhanced Processing
1. User query or document context is embedded using SentenceTransformers
2. FAISS performs similarity search against knowledge base
3. Top-k relevant documents are retrieved
4. Retrieved context is injected into LLM prompt
5. LLM generates contextually accurate response

## Technology Stack

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **Hosting**: AWS Amplify OR Amazon S3 + CloudFront
- **Alternative Deployment**: Vercel

### Backend
- **Language**: Python
- **Framework**: Flask
- **Compute**: AWS Lambda (Python)
- **Alternative Deployment**: Render

### AI & Processing
- **OCR**: Amazon Textract OR Tesseract / PaddleOCR
- **LLM**: Amazon Bedrock (Gemini) OR Google Gemini / OpenAI
- **RAG Embeddings**: SentenceTransformers
- **Vector Store**: FAISS
- **Translation**: Amazon Translate OR AI-based translation for Indian languages

### Storage
- **Document Storage**: Local storage or Amazon S3
- **Buckets**: Upload, Processed

### Security & Identity
- **Authentication**: Amazon Cognito
- **Authorization**: AWS IAM

### Deployment
- **Frontend**: AWS Amplify OR Amazon S3 + CloudFront OR Vercel
- **Backend**: AWS Lambda OR Render

## Deployment Model

### AWS-Based Deployment

#### Frontend Deployment
- **Option 1**: AWS Amplify for continuous deployment from Git repository
- **Option 2**: Static hosting on Amazon S3 with CloudFront CDN for global distribution

#### Backend Deployment
- AWS Lambda functions deployed via AWS SAM or Serverless Framework
- API Gateway for REST API endpoints
- Lambda execution roles configured via AWS IAM

#### Storage Deployment
- Amazon S3 buckets for Upload and Processed storage
- Bucket policies configured for Lambda access
- Lifecycle policies for temporary file cleanup

#### Security Deployment
- Amazon Cognito user pool for authentication
- IAM roles and policies for service permissions
- Secure token-based API authentication

### Alternative Deployment (Vercel + Render)

#### Frontend Deployment
- Vercel for React.js application hosting
- Automatic deployments from Git repository
- Global CDN distribution

#### Backend Deployment
- Render for Flask application hosting
- Python runtime environment
- Environment variables for API keys and configuration

#### Storage Deployment
- Local storage on Render instances OR Amazon S3 buckets
- File upload handling via Flask endpoints

### Hybrid Deployment
- Frontend on Vercel
- Backend on AWS Lambda
- Storage on Amazon S3
- AI services via AWS (Textract, Bedrock, Translate) OR external APIs (Google Gemini, OpenAI)
