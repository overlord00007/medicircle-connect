from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from enum import Enum
from datetime import datetime

# --- Enums ---
class UserRole(str, Enum):
    patient = "patient"
    doctor = "doctor"
    pharmacist = "pharmacist"
    admin = "admin"

class SourceType(str, Enum):
    web = "web"
    whatsapp = "whatsapp"

class SeverityLabel(str, Enum):
    strong = "strong"  # High Risk (Red)
    weak = "weak"      # Low Risk (Green)
    unexpected = "unexpected" # Anomaly (Yellow)
    normal = "normal"

class CaseStatus(str, Enum):
    pending = "pending"
    escalated = "escalated"
    reviewed = "reviewed"

# --- Core User Table ---
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True, nullable=True) # Optional for WhatsApp users
    password_hash: Optional[str] = None # Optional for WhatsApp users
    role: UserRole
    phone_number: str = Field(index=True, unique=True) # Primary Key for WhatsApp integration
    full_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    patient_profile: Optional["PatientProfile"] = Relationship(back_populates="user")
    doctor_profile: Optional["DoctorProfile"] = Relationship(back_populates="user")
    pharmacist_profile: Optional["PharmacistProfile"] = Relationship(back_populates="user")
    feedback_cases: List["Feedback"] = Relationship(back_populates="user")

# --- Role Specific Profiles ---
class PatientProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    age: Optional[int] = None
    gender: Optional[str] = None
    user: Optional[User] = Relationship(back_populates="patient_profile")

class DoctorProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    medical_license_id: str
    specialization: str
    user: Optional[User] = Relationship(back_populates="doctor_profile")

class PharmacistProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    pharmacy_license_id: str
    shop_name: str
    user: Optional[User] = Relationship(back_populates="pharmacist_profile")

# --- Inventory & Medicine ---
class Medicine(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None
    manufacturer: Optional[str] = None
    stock_level: int = Field(default=0)
    
    # AI/Knowledge Base Fields
    known_side_effects: Optional[str] = None # CSV or JSON string
    common_effects: Optional[str] = None

# --- Main Case/Feedback Table ---
class Feedback(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(foreign_key="user.id")
    
    medicine_name: str # Can be free text if not linked to Medicine ID yet
    symptoms: str
    
    source: SourceType = Field(default=SourceType.web)
    status: CaseStatus = Field(default=CaseStatus.pending)
    
    # AI Analysis Fields
    severity_score: float = Field(default=0.0)
    severity_label: SeverityLabel = Field(default=SeverityLabel.normal)
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    user: Optional[User] = Relationship(back_populates="feedback_cases")
