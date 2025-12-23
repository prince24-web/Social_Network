"use client"

import * as React from "react"
import { Check, MapPin, Briefcase, Github, Twitter, Linkedin, Instagram, Link as LinkIcon, ArrowLeft, Save } from "lucide-react"
import Loader from "@/components/ui/loader"
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
import Link from "next/link"

export default function EditProfilePage() {
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [profile, setProfile] = React.useState(null)

    // Form State
    const [selectedTech, setSelectedTech] = React.useState([])
    const [experience, setExperience] = React.useState("")
    const [country, setCountry] = React.useState("Nigeria")
    const [state, setState] = React.useState("")
    const [displayName, setDisplayName] = React.useState("")
    const [gender, setGender] = React.useState("")
    const [bio, setBio] = React.useState("")
    const [profileImage, setProfileImage] = React.useState(null)
    const [file, setFile] = React.useState(null)
    const [socials, setSocials] = React.useState({
        github: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        tiktok: ""
    })

    const supabase = createClient()
    const router = useRouter()

    React.useEffect(() => {
        const loadProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) {
                    router.push("/")
                    return
                }

                const { data: profileData, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single()

                if (error || !profileData) {
                    router.push("/onboarding")
                    return
                }

                // Populate form with existing data
                setProfile(profileData)
                setSelectedTech(profileData.tech_stack || [])
                setExperience(profileData.experience_level || "")
                setCountry(profileData.location_country || "Nigeria")
                setState(profileData.location_state || "")
                setDisplayName(profileData.display_name || "")
                setGender(profileData.gender || "")
                setBio(profileData.bio || "")
                setProfileImage(profileData.avatar_url || null)
                setSocials(profileData.social_links || {
                    github: "",
                    twitter: "",
                    linkedin: "",
                    instagram: "",
                    tiktok: ""
                })

            } catch (error) {
                console.error("Error loading profile:", error)
            } finally {
                setLoading(false)
            }
        }
        loadProfile()
    }, [router, supabase])

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            const url = URL.createObjectURL(selectedFile)
            setProfileImage(url)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                console.error("No user found")
                return
            }

            let avatarUrl = profile?.avatar_url || ""

            // Upload new avatar if changed
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

            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    display_name: displayName,
                    gender: gender,
                    full_name: displayName || profile?.username,
                    avatar_url: avatarUrl,
                    bio,
                    tech_stack: selectedTech,
                    experience_level: experience,
                    location_country: country,
                    location_state: state,
                    social_links: socials,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", user.id)

            if (updateError) {
                throw updateError
            }

            router.push(`/u/${profile?.username}`)

        } catch (error) {
            console.error("Error saving profile:", error)
            alert("Failed to save profile. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    const toggleTech = (techName) => {
        setSelectedTech((prev) =>
            prev.includes(techName)
                ? prev.filter((t) => t !== techName)
                : [...prev, techName]
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background relative">
                <Loader />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
                <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={`/u/${profile?.username}`}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-bold">Edit Profile</h1>
                    </div>
                    <Button onClick={handleSave} disabled={saving} className="gap-2">
                        <Save className="h-4 w-4" />
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>

            <div className="container max-w-4xl mx-auto px-4 py-8 space-y-12">

                {/* Profile Picture */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Profile Picture</h2>
                    <div className="flex items-center gap-6">
                        <div
                            className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-all hover:border-primary/50"
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
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Upload a new photo</p>
                            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Basic Info */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Basic Info</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input
                                id="displayName"
                                placeholder="John Doe"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <div className="flex gap-2">
                                {["Male", "Female"].map((g) => (
                                    <Pill
                                        key={g}
                                        variant={gender === g ? "default" : "outline"}
                                        className={cn(
                                            "cursor-pointer px-4",
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
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
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
                </section>

                <Separator />

                {/* Experience & Location */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Experience & Location</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Country</Label>
                            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground opacity-50 cursor-not-allowed">
                                Nigeria
                            </div>
                        </div>
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
                </section>

                <Separator />

                {/* Tech Stack */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Tech Stack</h2>
                    <p className="text-sm text-muted-foreground">Select the technologies you work with.</p>
                    <div className="flex flex-wrap gap-2">
                        {TECH_STACK.map((tech) => {
                            const isSelected = selectedTech.includes(tech.name)
                            return (
                                <Pill
                                    key={tech.name}
                                    variant={isSelected ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer transition-all hover:scale-105 select-none",
                                        isSelected ? "hover:bg-primary/90" : "hover:bg-accent"
                                    )}
                                    onClick={() => toggleTech(tech.name)}
                                >
                                    <PillAvatar src={tech.logo} className={
                                        cn("mr-2 h-4 w-4", tech.invertDark && "dark:invert")
                                    } fallback={tech.name[0]} />
                                    {tech.name}
                                </Pill>
                            )
                        })}
                    </div>
                </section>

                <Separator />

                {/* Social Links */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold">Social Links</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="relative">
                            <Github className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="GitHub Username"
                                className="pl-9"
                                value={socials.github || ""}
                                onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <Twitter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="X (Twitter) Username"
                                className="pl-9"
                                value={socials.twitter || ""}
                                onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="LinkedIn Username"
                                className="pl-9"
                                value={socials.linkedin || ""}
                                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <Instagram className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Instagram Username"
                                className="pl-9"
                                value={socials.instagram || ""}
                                onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="TikTok Username"
                                className="pl-9"
                                value={socials.tiktok || ""}
                                onChange={(e) => setSocials({ ...socials, tiktok: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
