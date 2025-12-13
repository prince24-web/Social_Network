"use client"

import * as React from "react"
import { Check, MapPin, Briefcase, Github, Twitter, Linkedin, Instagram, Link as LinkIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Pill, PillAvatar } from "@/components/kibo-ui/pill"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { TECH_STACK, EXPERIENCE_LEVELS, NIGERIAN_STATES } from "@/lib/constants"



import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = React.useState(1)
    const [selectedTech, setSelectedTech] = React.useState([])

    // Phase 2 State
    const [experience, setExperience] = React.useState("")
    const [country, setCountry] = React.useState("Nigeria")
    const [state, setState] = React.useState("")

    // Phase 3 State
    const [displayName, setDisplayName] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [gender, setGender] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [profileImage, setProfileImage] = React.useState(null)
    const [file, setFile] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    // Phase 4 State
    const [socials, setSocials] = React.useState({
        github: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        tiktok: ""
    })

    const totalSteps = 4
    const supabase = createClient()
    const router = useRouter()

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            const url = URL.createObjectURL(selectedFile)
            setProfileImage(url)
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                console.error("No user found")
                return
            }

            let avatarUrl = ""

            if (file) {
                const fileExt = file.name.split('.').pop()
                const filePath = `public/${user.id}/${Date.now()}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, file)

                if (uploadError) {
                    console.error("Error uploading avatar:", uploadError)
                } else {
                    const { data: { publicUrl } } = supabase.storage
                        .from('avatars')
                        .getPublicUrl(filePath)
                    avatarUrl = publicUrl
                }
            }

            const { error: insertError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    username,
                    display_name: displayName,
                    gender: gender,
                    full_name: displayName || username,
                    avatar_url: avatarUrl,
                    bio,
                    tech_stack: selectedTech,
                    experience_level: experience,
                    location_country: country,
                    location_state: state,
                    social_links: socials,
                    updated_at: new Date().toISOString(),
                })

            if (insertError) {
                throw insertError
            }

            router.push("/")

        } catch (error) {
            console.error("Error saving profile:", error)
            alert("Failed to save profile. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const toggleTech = (techName) => {
        setSelectedTech((prev) =>
            prev.includes(techName)
                ? prev.filter((t) => t !== techName)
                : [...prev, techName]
        )
    }

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-start p-6 md:p-24 bg-card">
            <div className="w-full max-w-4xl space-y-12">

                {/* Stepper */}
                <div className="relative flex w-full items-center justify-between">
                    <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted" />
                    <div
                        className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300 ease-in-out"
                        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    />

                    {Array.from({ length: totalSteps }).map((_, index) => {
                        const stepNumber = index + 1
                        const isCompleted = stepNumber < currentStep
                        const isActive = stepNumber === currentStep

                        return (
                            <div key={stepNumber} className="relative z-10 flex flex-col items-center gap-2 bg-card px-2">
                                <div
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                                        isCompleted
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : isActive
                                                ? "border-primary bg-background text-primary"
                                                : "border-muted-foreground/30 bg-background text-muted-foreground"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="h-6 w-6" />
                                    ) : (
                                        <span className="text-sm font-semibold">{stepNumber}</span>
                                    )}
                                </div>
                                <span className={cn(
                                    "absolute -bottom-8 whitespace-nowrap text-xs font-medium",
                                    isActive ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {stepNumber === 1 && "Tech Stack"}
                                    {stepNumber === 2 && "Profile Info"}
                                    {stepNumber === 3 && "Identity"}
                                    {stepNumber === 4 && "Socials"}
                                </span>
                            </div>
                        )
                    })}
                </div>

                {/* Content */}
                <div className="mt-12 min-h-[400px]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {currentStep === 1 && "Choose your Arsenal"}
                            {currentStep === 2 && "Experience & Location"}
                            {currentStep === 3 && "Your Identity"}
                            {currentStep === 4 && "Socials & Bio"}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {currentStep === 1 && "Select the languages and frameworks you work with."}
                            {currentStep === 2 && "Tell us about your journey and where you're based."}
                            {currentStep === 3 && "How should we call you? Pick a username and avatar."}
                            {currentStep === 4 && "Tell us about yourself and where we can find you."}
                        </p>
                    </div>

                    {currentStep === 1 && (
                        <div className="flex flex-wrap justify-center gap-3">
                            {TECH_STACK.map((tech) => {
                                const isSelected = selectedTech.includes(tech.name)
                                return (
                                    <Pill
                                        key={tech.name}
                                        variant={isSelected ? "default" : "outline"}
                                        className={cn(
                                            "cursor-pointer transition-all hover:scale-105 select-none text-base py-2 px-4",
                                            isSelected ? "hover:bg-primary/90" : "hover:bg-accent"
                                        )}
                                        onClick={() => toggleTech(tech.name)}
                                    >
                                        <PillAvatar src={tech.logo} className={
                                            cn("mr-2 h-5 w-5", tech.invertDark && "dark:invert")
                                        } fallback={tech.name[0]} />
                                        {tech.name}
                                    </Pill>
                                )
                            })}
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="flex flex-col gap-8 max-w-2xl mx-auto">

                            {/* Experience Selection */}
                            <div className="space-y-4">
                                <Label>Years of Experience</Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {EXPERIENCE_LEVELS.map((level) => (
                                        <Card
                                            key={level.id}
                                            className={cn(
                                                "cursor-pointer p-4 transition-all hover:border-primary/50 hover:bg-accent/50 flex flex-col items-center justify-center text-center gap-2",
                                                experience === level.id ? "border-primary bg-accent ring-1 ring-primary" : ""
                                            )}
                                            onClick={() => setExperience(level.id)}
                                        >
                                            <Briefcase className={cn("h-6 w-6", experience === level.id ? "text-primary" : "text-muted-foreground")} />
                                            <div className="font-semibold">{level.label}</div>
                                            <div className="text-xs text-muted-foreground">{level.description}</div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Location Selection */}
                            <div className="space-y-4">
                                <Label>Location</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Country - Read Only for now as requested */}
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">Country</Label>
                                        <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground opacity-50 cursor-not-allowed">
                                            Nigeria
                                        </div>
                                    </div>

                                    {/* State Selector */}
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">State</Label>
                                        <Select value={state} onValueChange={setState}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {NIGERIAN_STATES.map((s) => (
                                                    <SelectItem key={s} value={s}>
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {currentStep === 3 && (
                        <div className="flex flex-col gap-8 max-w-xl mx-auto items-center">

                            {/* Profile Picture Upload */}
                            <div className="flex flex-col items-center gap-4">
                                <Label>Profile Picture</Label>
                                <div
                                    className="group relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-all hover:border-primary/50 hover:bg-accent"
                                    onClick={() => document.getElementById("profile-upload").click()}
                                >
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-center text-xs text-muted-foreground p-2">
                                            <span className="text-xl">📷</span>
                                            <span>Upload Photo</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                                        <span className="text-xs font-medium text-white">Change</span>
                                    </div>
                                </div>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <p className="text-xs text-muted-foreground text-center max-w-[200px]">
                                    Click to upload or drag and drop. SVG, PNG, JPG or GIF (max. 800x400px).
                                </p>
                            </div>

                            {/* Display Name Input */}
                            <div className="w-full space-y-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    placeholder="John Doe"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="text-center text-lg md:text-left md:text-base"
                                />
                            </div>

                            {/* Username Input */}
                            <div className="w-full space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="@developer_xyz"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="text-center text-lg md:text-left md:text-base"
                                />
                                <p className="text-xs text-muted-foreground">
                                    This is your public display name.
                                </p>
                            </div>

                            {/* Gender Selection (Pills) */}
                            <div className="w-full space-y-2">
                                <Label>Gender</Label>
                                <div className="flex justify-center md:justify-start gap-4">
                                    {["Male", "Female"].map((g) => (
                                        <Pill
                                            key={g}
                                            variant={gender === g ? "default" : "outline"}
                                            className={cn(
                                                "cursor-pointer px-6",
                                                gender === g ? "hover:bg-primary/90" : "hover:bg-accent"
                                            )}
                                            onClick={() => setGender(g)}
                                        >
                                            {g}
                                        </Pill>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}


                    {currentStep === 4 && (
                        <div className="flex flex-col gap-8 max-w-xl mx-auto">

                            {/* Short Bio */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Short Bio</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell us a bit about yourself..."
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="resize-none h-24"
                                        maxLength={160}
                                    />
                                    <p className="text-xs text-muted-foreground text-right">
                                        {bio.length}/160
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            {/* Social Links */}
                            <div className="space-y-4">
                                <Label>Social Links <span className="text-xs text-muted-foreground font-normal ml-1">(Optional)</span></Label>
                                <div className="grid gap-4">
                                    <div className="relative">
                                        <Github className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="GitHub Username"
                                            className="pl-9"
                                            value={socials.github}
                                            onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Twitter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="X (Twitter) Username"
                                            className="pl-9"
                                            value={socials.twitter}
                                            onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="LinkedIn Username"
                                            className="pl-9"
                                            value={socials.linkedin}
                                            onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Instagram Username"
                                            className="pl-9"
                                            value={socials.instagram}
                                            onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                                        />
                                    </div>
                                    {/* TikTok (Custom Icon or generic Link for now) */}
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="TikTok Username"
                                            className="pl-9"
                                            value={socials.tiktok}
                                            onChange={(e) => setSocials({ ...socials, tiktok: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-8">
                    <Button
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        className={cn(currentStep === 1 && "invisible")}
                    >
                        Previous
                    </Button>
                    <Button onClick={currentStep === totalSteps ? handleSubmit : handleNext} disabled={loading}>
                        {loading ? "Saving..." : (currentStep === totalSteps ? "Finish" : "Next")}
                    </Button>
                </div>

            </div>
        </div>
    )
}
