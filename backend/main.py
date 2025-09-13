from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uuid
import os
from datetime import datetime

app = FastAPI(title="Auralearn API", description="AI-powered learning platform API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class StudyPlan(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    topics: List[str]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class StudyPlanCreate(BaseModel):
    title: str
    description: str
    topics: List[str]

class ChatMessage(BaseModel):
    message: str
    user_id: Optional[str] = "default"

class ChatResponse(BaseModel):
    response: str
    timestamp: datetime

# In-memory storage (replace with database in production)
study_plans_db = {}
uploaded_files_db = {}

@app.get("/")
async def root():
    return {"message": "Welcome to Auralearn API"}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload study materials"""
    try:
        # Create uploads directory if it doesn't exist
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        
        # Generate unique filename
        file_id = str(uuid.uuid4())
        file_extension = os.path.splitext(file.filename)[1]
        saved_filename = f"{file_id}{file_extension}"
        file_path = os.path.join(upload_dir, saved_filename)
        
        # Save file
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
        
        # Store file info
        file_info = {
            "id": file_id,
            "original_name": file.filename,
            "saved_name": saved_filename,
            "size": len(content),
            "uploaded_at": datetime.now(),
            "path": file_path
        }
        uploaded_files_db[file_id] = file_info
        
        return JSONResponse(content={
            "success": True,
            "file_id": file_id,
            "filename": file.filename,
            "message": "File uploaded successfully"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.get("/api/files")
async def get_uploaded_files():
    """Get list of uploaded files"""
    return {"files": list(uploaded_files_db.values())}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_ai(message: ChatMessage):
    """AI tutor chat endpoint"""
    # Mock AI response - replace with actual AI integration
    ai_responses = [
        "That's a great question! Let me help you understand this concept better.",
        "Based on your study materials, I recommend focusing on the fundamentals first.",
        "Here's a simple way to think about this topic...",
        "Let's break this down into smaller, manageable parts.",
        "I can create a practice quiz for you on this topic. Would that be helpful?"
    ]
    
    import random
    response = random.choice(ai_responses)
    
    return ChatResponse(
        response=f"AI Tutor: {response}",
        timestamp=datetime.now()
    )

@app.post("/api/study-plans")
async def create_study_plan(plan_data: StudyPlanCreate):
    """Create a new study plan"""
    plan = StudyPlan(
        id=str(uuid.uuid4()),
        title=plan_data.title,
        description=plan_data.description,
        topics=plan_data.topics,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    
    study_plans_db[plan.id] = plan
    return {"success": True, "study_plan": plan}

@app.get("/api/study-plans")
async def get_study_plans():
    """Get all study plans"""
    return {"study_plans": list(study_plans_db.values())}

@app.get("/api/study-plans/{plan_id}")
async def get_study_plan(plan_id: str):
    """Get a specific study plan"""
    if plan_id not in study_plans_db:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    return {"study_plan": study_plans_db[plan_id]}

@app.put("/api/study-plans/{plan_id}")
async def update_study_plan(plan_id: str, plan: StudyPlan):
    """Update a study plan"""
    if plan_id not in study_plans_db:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    plan.id = plan_id
    plan.updated_at = datetime.now()
    plan.created_at = study_plans_db[plan_id].created_at
    
    study_plans_db[plan_id] = plan
    return {"success": True, "study_plan": plan}

@app.delete("/api/study-plans/{plan_id}")
async def delete_study_plan(plan_id: str):
    """Delete a study plan"""
    if plan_id not in study_plans_db:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    del study_plans_db[plan_id]
    return {"success": True, "message": "Study plan deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)