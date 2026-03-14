'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCountdownDate, updateCountdownDate, getDiscountPopupStatus, updateDiscountPopupStatus, loginAdmin, getHomepageVersion, updateHomepageVersion, getHiddenProducts, updateHiddenProducts, getChatModel, updateChatModel, getChatKnowledge, updateChatKnowledge, getChatSuggestions, updateChatSuggestions, getPopupABConfig, updatePopupABConfig, getPopupABResults, getChatbotEnabled, updateChatbotEnabled, getJourneyConfigs, updateJourneyConfigs } from '@/actions/admin-actions'
import type { PopupABConfig, JourneyConfig, JourneyProduct } from '@/actions/admin-actions'

type AdminTab = 'chatbot' | 'marketing' | 'other' | 'ab-config' | 'ab-results' | 'journeys'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState('')
    const [activeTab, setActiveTab] = useState<AdminTab>('chatbot')

    // Date State
    const [date, setDate] = useState('')

    // Feature Toggle State
    const [showDiscount, setShowDiscount] = useState(true)
    const [homepageVersion, setHomepageVersion] = useState<'old' | 'special-offer'>('special-offer')
    const [hiddenProducts, setHiddenProducts] = useState<string[]>(['reservation', 'reserve50'])
    const [isChatbotEnabled, setIsChatbotEnabled] = useState(true)
    const [chatModel, setChatModel] = useState('google:gemini-2.5-flash')
    const [availableModels, setAvailableModels] = useState<{ id: string; provider: string; name: string }[]>([])
    const [modelsLoading, setModelsLoading] = useState(false)
    const [chatKnowledge, setChatKnowledge] = useState('')
    const [knowledgeSaving, setKnowledgeSaving] = useState(false)
    const [knowledgeMessage, setKnowledgeMessage] = useState('')
    const [chatSuggestions, setChatSuggestions] = useState<string[]>([])
    const [newSuggestion, setNewSuggestion] = useState('')
    const [suggestionsSaving, setSuggestionsSaving] = useState(false)
    const [suggestionsMessage, setSuggestionsMessage] = useState('')
    const [dragIndex, setDragIndex] = useState<number | null>(null)
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [editingText, setEditingText] = useState('')

    // A/B Testing State
    const [abConfig, setAbConfig] = useState<PopupABConfig>({
        enabled: false,
        mode: 'random',
        control: { entries: [{ type: 'pdf', delaySec: 30 }, { type: 'shipping', delaySec: 300 }] },
        variant: { entries: [{ type: 'shipping', delaySec: 30 }, { type: 'pdf', delaySec: 300 }] },
    })
    const [abSaving, setAbSaving] = useState(false)
    const [abMessage, setAbMessage] = useState('')
    const [abResults, setAbResults] = useState<{ summary: { variant: string; qualified: number; conversions: number; conversionRate: number }[]; sessions: { date: string; ip: string; bucket: string; timeOnSiteSec: number; converted: boolean }[] }>({ summary: [], sessions: [] })
    const [abResultsLoading, setAbResultsLoading] = useState(false)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    // Journey Engine State
    const [journeys, setJourneys] = useState<JourneyConfig[]>([])
    const [journeySaving, setJourneySaving] = useState(false)
    const [journeyMessage, setJourneyMessage] = useState('')
    const [journeyJsonMode, setJourneyJsonMode] = useState(false)
    const [journeyJson, setJourneyJson] = useState('')

    useEffect(() => {
        const storedAuth = localStorage.getItem('admin_token')
        if (storedAuth === 'sorenkier_valid') {
            setIsAuthenticated(true)
            loadData()
        } else {
            setLoading(false)
        }
    }, [])

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setAuthError('')

        const res = await loginAdmin(password)
        if (res.success) {
            localStorage.setItem('admin_token', 'sorenkier_valid')
            setIsAuthenticated(true)
            loadData()
        } else {
            setAuthError('Invalid Password')
        }
    }

    async function loadData() {
        setLoading(true)
        const [dateVal, discountVal, versionVal, hiddenVal, chatModelVal, chatKnowledgeVal, chatSuggestionsVal, abConfigVal, chatbotEnabledVal, journeyConfigsVal] = await Promise.all([
            getCountdownDate(),
            getDiscountPopupStatus(),
            getHomepageVersion(),
            getHiddenProducts(),
            getChatModel(),
            getChatKnowledge(),
            getChatSuggestions(),
            getPopupABConfig(),
            getChatbotEnabled(),
            getJourneyConfigs()
        ])

        if (dateVal) setDate(dateVal)
        else setDate('2026-01-19T21:00:00-08:00')

        setShowDiscount(discountVal === 'true')
        setHomepageVersion(versionVal as 'old' | 'special-offer')
        setHiddenProducts(hiddenVal)
        setChatModel(chatModelVal)
        setChatKnowledge(chatKnowledgeVal)
        setChatSuggestions(chatSuggestionsVal)
        setAbConfig(abConfigVal)
        setIsChatbotEnabled(chatbotEnabledVal)
        setJourneys(journeyConfigsVal)
        setJourneyJson(JSON.stringify(journeyConfigsVal, null, 2))

        // Fetch available models in background
        setModelsLoading(true)
        fetch('/api/chatbot-models')
            .then(r => r.json())
            .then(d => setAvailableModels(d.models || []))
            .catch(() => { })
            .finally(() => setModelsLoading(false))

        setLoading(false)
    }

    async function handleSaveCountdown(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)
        setMessage('')

        const res = await updateCountdownDate(date)
        if (res.success) {
            setMessage('Date updated successfully!')
        } else {
            setMessage(`Failed to update date: ${res.error}`)
        }
        setSaving(false)
    }

    async function handleToggleDiscount() {
        const newValue = !showDiscount
        setShowDiscount(newValue)

        const res = await updateDiscountPopupStatus(newValue)
        if (!res.success) {
            setShowDiscount(!newValue)
            alert('Failed to update discount status')
        }
    }

    async function handleVersionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newVersion = e.target.value as 'old' | 'special-offer'
        setHomepageVersion(newVersion)

        const res = await updateHomepageVersion(newVersion)
        if (!res.success) {
            alert('Failed to update homepage version')
            loadData()
        }
    }

    async function handleChatModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newModel = e.target.value
        setChatModel(newModel)
        const res = await updateChatModel(newModel)
        if (!res.success) {
            alert('Failed to update chatbot model')
            loadData()
        }
    }

    async function handleToggleChatbot() {
        const newValue = !isChatbotEnabled
        setIsChatbotEnabled(newValue)

        const res = await updateChatbotEnabled(newValue)
        if (!res.success) {
            setIsChatbotEnabled(!newValue)
            alert('Failed to update chatbot status')
        }
    }

    async function handleSaveKnowledge() {
        setKnowledgeSaving(true)
        setKnowledgeMessage('')
        const res = await updateChatKnowledge(chatKnowledge)
        if (res.success) {
            setKnowledgeMessage('Knowledge base updated!')
        } else {
            setKnowledgeMessage('Failed to save knowledge base')
        }
        setKnowledgeSaving(false)
        setTimeout(() => setKnowledgeMessage(''), 3000)
    }

    async function handleAddSuggestion() {
        if (!newSuggestion.trim()) return
        const updated = [...chatSuggestions, newSuggestion.trim()]
        setChatSuggestions(updated)
        setNewSuggestion('')
        setSuggestionsSaving(true)
        const res = await updateChatSuggestions(updated)
        if (!res.success) {
            alert('Failed to save suggestion')
            setChatSuggestions(chatSuggestions)
        }
        setSuggestionsSaving(false)
    }

    async function handleRemoveSuggestion(index: number) {
        const updated = chatSuggestions.filter((_, i) => i !== index)
        setChatSuggestions(updated)
        setSuggestionsSaving(true)
        const res = await updateChatSuggestions(updated)
        if (!res.success) {
            alert('Failed to remove suggestion')
            setChatSuggestions(chatSuggestions)
        }
        setSuggestionsSaving(false)
    }

    async function handleReorderSuggestions(fromIndex: number, toIndex: number) {
        if (fromIndex === toIndex) return
        const updated = [...chatSuggestions]
        const [moved] = updated.splice(fromIndex, 1)
        updated.splice(toIndex, 0, moved)
        setChatSuggestions(updated)
        setSuggestionsSaving(true)
        const res = await updateChatSuggestions(updated)
        if (!res.success) {
            alert('Failed to reorder suggestions')
            setChatSuggestions(chatSuggestions)
        }
        setSuggestionsSaving(false)
    }

    function startEditing(index: number) {
        setEditingIndex(index)
        setEditingText(chatSuggestions[index])
    }

    async function handleSaveEdit() {
        if (editingIndex === null || !editingText.trim()) return
        const updated = [...chatSuggestions]
        updated[editingIndex] = editingText.trim()
        setChatSuggestions(updated)
        setEditingIndex(null)
        setEditingText('')
        setSuggestionsSaving(true)
        const res = await updateChatSuggestions(updated)
        if (!res.success) {
            alert('Failed to save edit')
            setChatSuggestions(chatSuggestions)
        }
        setSuggestionsSaving(false)
    }

    if (!isAuthenticated && !loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white p-4">
                <div className="w-full max-w-md bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow-2xl">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                autoFocus
                            />
                        </div>
                        {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
                <div className="animate-pulse">Loading Admin Config...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-neutral-400">Manage global site settings and configurations.</p>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_token')
                            window.location.reload()
                        }}
                        className="text-xs text-red-400 hover:text-red-300 underline"
                    >
                        Logout
                    </button>
                </div>

                {/* TAB NAVIGATION */}
                <div className="flex border-b border-neutral-800 mb-8">
                    {([
                        { key: 'chatbot' as AdminTab, label: '💬 Chatbot' },
                        { key: 'marketing' as AdminTab, label: '📢 Marketing' },
                        { key: 'ab-config' as AdminTab, label: '🧪 A/B Config' },
                        { key: 'ab-results' as AdminTab, label: '📊 A/B Results' },
                        { key: 'other' as AdminTab, label: '⚙️ Other' },
                        { key: 'journeys' as AdminTab, label: '🚀 Journeys' },
                    ]).map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.key
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ─── TAB 1: CHATBOT SETTINGS ─── */}
                {activeTab === 'chatbot' && (
                    <div className="space-y-6">
                        {/* Master Toggle */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-white">Enable Chatbot</h3>
                                    <p className="text-sm text-neutral-500">Show or hide the chatbot on the website.</p>
                                </div>
                                <button
                                    onClick={handleToggleChatbot}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${isChatbotEnabled ? 'bg-green-600' : 'bg-neutral-700'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isChatbotEnabled ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Chatbot Model */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h3 className="font-medium text-white mb-1">AI Model</h3>
                            <p className="text-sm text-neutral-500 mb-4">Choose which AI model powers the support chatbot.</p>
                            <select
                                value={chatModel}
                                onChange={handleChatModelChange}
                                disabled={modelsLoading}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white text-sm outline-none focus:border-blue-500 disabled:opacity-50"
                            >
                                {modelsLoading && <option>Loading models...</option>}
                                {!modelsLoading && availableModels.length === 0 && (
                                    <option value={chatModel}>{chatModel}</option>
                                )}
                                {['Google', 'Anthropic'].map(provider => {
                                    const group = availableModels.filter(m => m.provider === provider)
                                    if (group.length === 0) return null
                                    return (
                                        <optgroup key={provider} label={provider}>
                                            {group.map(m => (
                                                <option key={m.id} value={m.id}>{m.name}</option>
                                            ))}
                                        </optgroup>
                                    )
                                })}
                            </select>
                            <p className="text-xs text-neutral-600 mt-2 font-mono">{chatModel}</p>
                        </div>

                        {/* Knowledge Base */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h3 className="font-medium text-white mb-1">Knowledge Base</h3>
                            <p className="text-sm text-neutral-500 mb-3">Product info, pricing, shipping details — the chatbot will use this to answer questions accurately.</p>
                            <textarea
                                value={chatKnowledge}
                                onChange={(e) => setChatKnowledge(e.target.value)}
                                rows={10}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white text-sm outline-none focus:border-blue-500 font-mono leading-relaxed resize-y"
                                placeholder={`Example:\n- DS5.5: 5.5-inch keys, designed for hand spans under 8.5 inches\n- DS6.0: 6.0-inch keys, suits most adult hand sizes\n- Pricing: Starts at $1,099 for the DreamPlay One\n- Shipping: Batch 1 ships August 2026`}
                            />
                            <div className="flex items-center justify-between mt-3">
                                <span className={`text-sm ${knowledgeMessage.includes('updated') ? 'text-green-400' : knowledgeMessage ? 'text-red-400' : 'text-transparent'}`}>
                                    {knowledgeMessage || '.'}
                                </span>
                                <button
                                    onClick={handleSaveKnowledge}
                                    disabled={knowledgeSaving}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    {knowledgeSaving ? 'Saving...' : 'Save Knowledge'}
                                </button>
                            </div>
                        </div>

                        {/* Suggested Questions */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h3 className="font-medium text-white mb-1">Suggested Questions</h3>
                            <p className="text-sm text-neutral-500 mb-4">These appear on the chatbot&apos;s blank screen. Users can tap to send instantly. Drag to reorder.</p>
                            <div className="space-y-2 mb-4">
                                {chatSuggestions.map((q, i) => (
                                    <div
                                        key={`${i}-${q}`}
                                        draggable
                                        onDragStart={() => setDragIndex(i)}
                                        onDragOver={(e) => { e.preventDefault(); setDragOverIndex(i); }}
                                        onDragLeave={() => setDragOverIndex(null)}
                                        onDrop={() => {
                                            if (dragIndex !== null) handleReorderSuggestions(dragIndex, i);
                                            setDragIndex(null);
                                            setDragOverIndex(null);
                                        }}
                                        onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                                        className={`flex items-center gap-2 p-2 bg-neutral-800 rounded-lg border transition-all ${dragOverIndex === i && dragIndex !== i
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : dragIndex === i
                                                ? 'border-neutral-600 opacity-50'
                                                : 'border-neutral-700'
                                            }`}
                                    >
                                        {/* Drag handle */}
                                        <span className="cursor-grab active:cursor-grabbing text-neutral-500 hover:text-neutral-300 px-1 select-none" title="Drag to reorder">
                                            ⠿
                                        </span>
                                        {editingIndex === i ? (
                                            <input
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSaveEdit(); } if (e.key === 'Escape') { setEditingIndex(null); } }}
                                                autoFocus
                                                className="flex-1 bg-neutral-900 border border-neutral-600 rounded px-2 py-1 text-sm text-white outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <span className="flex-1 text-sm text-white">{q}</span>
                                        )}
                                        <div className="flex items-center gap-1">
                                            {editingIndex === i ? (
                                                <>
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="text-green-400 hover:text-green-300 text-xs px-2 py-1 rounded hover:bg-green-500/10 transition-colors"
                                                        title="Save"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingIndex(null)}
                                                        className="text-neutral-400 hover:text-neutral-300 text-xs px-2 py-1 rounded hover:bg-neutral-700 transition-colors"
                                                        title="Cancel"
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => startEditing(i)}
                                                        className="text-blue-400 hover:text-blue-300 text-xs px-2 py-1 rounded hover:bg-blue-500/10 transition-colors"
                                                        title="Edit"
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveSuggestion(i)}
                                                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                                                        title="Remove"
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {chatSuggestions.length === 0 && (
                                    <p className="text-xs text-neutral-600 italic">No suggested questions yet. Add some below.</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    value={newSuggestion}
                                    onChange={(e) => setNewSuggestion(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSuggestion(); } }}
                                    placeholder="e.g. When does the DreamPlay One ship?"
                                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white text-sm outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleAddSuggestion}
                                    disabled={!newSuggestion.trim() || suggestionsSaving}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── TAB 2: MARKETING FEATURES ─── */}
                {activeTab === 'marketing' && (
                    <div className="space-y-6">
                        {/* Newsletter Popup */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-white">Newsletter Popup</h3>
                                    <p className="text-sm text-neutral-500">Enable or disable the newsletter popup globally.</p>
                                </div>
                                <button
                                    onClick={handleToggleDiscount}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${showDiscount ? 'bg-green-600' : 'bg-neutral-700'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${showDiscount ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Homepage Version */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-white">Homepage Version</h3>
                                    <p className="text-sm text-neutral-500">Switch between the old homepage and the special offer.</p>
                                </div>
                                <select
                                    value={homepageVersion}
                                    onChange={handleVersionChange}
                                    className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="special-offer">Special Offer</option>
                                    <option value="old">Old Homepage</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Visibility */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h3 className="font-medium text-white mb-1">Product Visibility</h3>
                            <p className="text-sm text-neutral-500 mb-4">Show or hide pricing tiers on the /customize page.</p>
                            <div className="space-y-3">
                                {[
                                    { id: 'reservation', label: 'Lock My Spot', price: '$99' },
                                    { id: 'reserve50', label: 'Reserve (50%)', price: '$274' },
                                    { id: 'solo', label: 'DreamPlay One', price: '$1,099' },
                                    { id: 'full', label: 'DreamPlay Bundle', price: '$1,199' },
                                    { id: 'signature', label: 'DreamPlay Signature', price: '$999' },
                                ].map(product => {
                                    const isVisible = !hiddenProducts.includes(product.id)
                                    return (
                                        <div key={product.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/40">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-sm font-medium ${isVisible ? 'text-white' : 'text-neutral-500 line-through'}`}>{product.label}</span>
                                                <span className="text-xs text-neutral-600 font-mono">{product.price}</span>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    const next = isVisible
                                                        ? [...hiddenProducts, product.id]
                                                        : hiddenProducts.filter(id => id !== product.id)
                                                    setHiddenProducts(next)
                                                    const res = await updateHiddenProducts(next)
                                                    if (!res.success) {
                                                        setHiddenProducts(hiddenProducts)
                                                        alert('Failed to update product visibility')
                                                    }
                                                }}
                                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${isVisible ? 'bg-green-600' : 'bg-neutral-700'}`}
                                            >
                                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isVisible ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── TAB 3: OTHER ─── */}
                {activeTab === 'other' && (
                    <div className="space-y-6">
                        {/* Content Management */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span>📚</span> Content Management
                            </h2>
                            <div className="space-y-4">
                                <Link href="/admin/faq" className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-neutral-800 hover:border-blue-500/50 transition-colors group">
                                    <div>
                                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">Manage FAQs</h3>
                                        <p className="text-sm text-neutral-500">Edit, add, or remove questions from the FAQ page.</p>
                                    </div>
                                    <span className="text-neutral-500 group-hover:text-blue-400 transition-colors">→</span>
                                </Link>

                                <Link href="/admin/customize-urls" className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-neutral-800 hover:border-blue-500/50 transition-colors group">
                                    <div>
                                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">Customize Page URLs</h3>
                                        <p className="text-sm text-neutral-500">Update destination links for pricing buttons.</p>
                                    </div>
                                    <span className="text-neutral-500 group-hover:text-blue-400 transition-colors">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Countdown Settings */}
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span>⏳</span> Countdown Settings
                            </h2>

                            <form onSubmit={handleSaveCountdown} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Countdown End Date (ISO Format)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        placeholder="YYYY-MM-DDTHH:mm:ss-ZZ:ZZ"
                                    />
                                    <p className="text-xs text-neutral-500 mt-2">
                                        Current format: ISO 8601 (e.g., 2026-01-19T21:00:00-08:00 for PST)
                                    </p>
                                    <div className="mt-2 text-xs text-neutral-600 bg-neutral-950 p-2 rounded border border-neutral-800">
                                        <strong>Preview Time:</strong> {new Date(date).toString() !== 'Invalid Date' ? new Date(date).toLocaleString() : 'Invalid Date'}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-neutral-800">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {saving ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            'Update Date'
                                        )}
                                    </button>
                                </div>

                                {message && (
                                    <div className={`p-3 rounded-lg text-sm text-center font-medium ${message.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}
                {/* ─── TAB 4: A/B CONFIG ─── */}
                {activeTab === 'ab-config' && (
                    <div className="space-y-6">
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-medium text-white">Popup A/B Test</h3>
                                    <p className="text-sm text-neutral-500">Enable to split visitors between two popup strategies.</p>
                                </div>
                                <button
                                    onClick={() => setAbConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${abConfig.enabled ? 'bg-green-600' : 'bg-neutral-700'}`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${abConfig.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-neutral-400 mb-1">Mode</label>
                                <select
                                    value={abConfig.mode}
                                    onChange={(e) => setAbConfig(prev => ({ ...prev, mode: e.target.value as 'random' | 'deterministic' }))}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="random">Random (50/50)</option>
                                    <option value="deterministic">Deterministic (Alternating)</option>
                                </select>
                            </div>
                        </div>

                        {/* Control / Variant Cards */}
                        {(['control', 'variant'] as const).map((bucket) => {
                            const setting = abConfig[bucket]
                            return (
                                <div key={bucket} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                                    <h3 className="font-medium text-white mb-1 capitalize">{bucket === 'control' ? 'Control (Setting 1)' : 'Variant (Setting 2)'}</h3>
                                    <p className="text-xs text-neutral-500 mb-4">Popup strategy for this group.</p>

                                    {setting.entries.map((entry, i) => {
                                        const delayMin = Math.floor(entry.delaySec / 60)
                                        const delaySec = entry.delaySec % 60
                                        const ordinal = i + 1
                                        const suffix = ordinal === 1 ? 'st' : ordinal === 2 ? 'nd' : ordinal === 3 ? 'rd' : 'th'
                                        return (
                                            <div key={i}>
                                                {i > 0 && <hr className="border-neutral-800 my-4" />}
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-sm text-neutral-400">{ordinal}{suffix} Popup</label>
                                                    {i > 0 && (
                                                        <button
                                                            onClick={() => {
                                                                const newEntries = setting.entries.filter((_, idx) => idx !== i)
                                                                setAbConfig(prev => ({ ...prev, [bucket]: { entries: newEntries } }))
                                                            }}
                                                            className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
                                                        >
                                                            ✕ Remove
                                                        </button>
                                                    )}
                                                </div>
                                                <select
                                                    value={entry.type}
                                                    onChange={(e) => {
                                                        const newEntries = [...setting.entries]
                                                        newEntries[i] = { ...newEntries[i], type: e.target.value }
                                                        setAbConfig(prev => ({ ...prev, [bucket]: { entries: newEntries } }))
                                                    }}
                                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white text-sm outline-none focus:border-blue-500 mb-3"
                                                >
                                                    <option value="shipping">Free Shipping</option>
                                                    <option value="pdf">PDF Guide</option>
                                                    <option value="discount">$300 Off</option>
                                                </select>

                                                <label className="block text-sm text-neutral-400 mb-2">{ordinal}{suffix} Popup Delay</label>
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="number" min={0}
                                                        value={delayMin}
                                                        onChange={(e) => {
                                                            const newSec = (parseInt(e.target.value) || 0) * 60 + delaySec
                                                            const newEntries = [...setting.entries]
                                                            newEntries[i] = { ...newEntries[i], delaySec: newSec }
                                                            setAbConfig(prev => ({ ...prev, [bucket]: { entries: newEntries } }))
                                                        }}
                                                        className="w-20 bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white text-sm outline-none focus:border-blue-500"
                                                    />
                                                    <span className="text-xs text-neutral-500">min</span>
                                                    <input
                                                        type="number" min={0} max={59}
                                                        value={delaySec}
                                                        onChange={(e) => {
                                                            const newSec = delayMin * 60 + (parseInt(e.target.value) || 0)
                                                            const newEntries = [...setting.entries]
                                                            newEntries[i] = { ...newEntries[i], delaySec: newSec }
                                                            setAbConfig(prev => ({ ...prev, [bucket]: { entries: newEntries } }))
                                                        }}
                                                        className="w-20 bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white text-sm outline-none focus:border-blue-500"
                                                    />
                                                    <span className="text-xs text-neutral-500">sec</span>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {setting.entries.length < 10 && (
                                        <>
                                            <hr className="border-neutral-800 my-4" />
                                            <button
                                                onClick={() => {
                                                    const newEntries = [...setting.entries, { type: 'pdf', delaySec: 300 }]
                                                    setAbConfig(prev => ({ ...prev, [bucket]: { entries: newEntries } }))
                                                }}
                                                className="w-full border border-dashed border-neutral-700 hover:border-neutral-500 text-neutral-500 hover:text-neutral-300 text-sm font-medium py-2.5 rounded-lg transition-colors"
                                            >
                                                + Add New Popup
                                            </button>
                                        </>
                                    )}
                                </div>
                            )
                        })}

                        {/* Save */}
                        <button
                            onClick={async () => {
                                setAbSaving(true)
                                setAbMessage('')
                                const res = await updatePopupABConfig(abConfig)
                                if (res.success) {
                                    setAbMessage('A/B config saved!')
                                } else {
                                    setAbMessage('Failed to save config')
                                }
                                setAbSaving(false)
                                setTimeout(() => setAbMessage(''), 3000)
                            }}
                            disabled={abSaving}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            {abSaving ? 'Saving...' : 'Save A/B Config'}
                        </button>
                        {abMessage && (
                            <div className={`p-3 rounded-lg text-sm text-center font-medium ${abMessage.includes('saved') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {abMessage}
                            </div>
                        )}
                    </div>
                )
                }

                {/* ─── TAB 5: A/B RESULTS ─── */}
                {activeTab === 'ab-results' && (
                    <div className="space-y-6">
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-white">Popup A/B Test Results</h3>
                                <button
                                    onClick={async () => {
                                        setAbResultsLoading(true)
                                        const data = await getPopupABResults()
                                        setAbResults(data)
                                        setAbResultsLoading(false)
                                    }}
                                    disabled={abResultsLoading}
                                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    {abResultsLoading ? 'Loading...' : 'Refresh'}
                                </button>
                            </div>

                            {abResults.summary.length === 0 && !abResultsLoading && (
                                <p className="text-neutral-500 text-sm">No data yet. Click Refresh to load results.</p>
                            )}

                            {/* Summary Table */}
                            {abResults.summary.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-neutral-700 text-neutral-400">
                                                <th className="text-left py-3 px-2 font-medium">Variant</th>
                                                <th className="text-right py-3 px-2 font-medium">Qualified (10s+)</th>
                                                <th className="text-right py-3 px-2 font-medium">Conversions</th>
                                                <th className="text-right py-3 px-2 font-medium">Conv. Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {abResults.summary.map(row => (
                                                <tr key={row.variant} className="border-b border-neutral-800">
                                                    <td className="py-3 px-2 text-white capitalize font-medium">{row.variant}</td>
                                                    <td className="py-3 px-2 text-right text-white">{row.qualified}</td>
                                                    <td className="py-3 px-2 text-right text-white">{row.conversions}</td>
                                                    <td className="py-3 px-2 text-right font-mono text-green-400">{row.conversionRate.toFixed(1)}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Per-Variant Session Breakdown */}
                        {abResults.sessions.length > 0 && (['control', 'variant'] as const).map(bucket => {
                            const bucketSessions = abResults.sessions.filter(s => s.bucket === bucket)
                            if (bucketSessions.length === 0) return null
                            return (
                                <div key={bucket} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                                    <h3 className="font-medium text-white mb-4 capitalize">{bucket} Sessions <span className="text-neutral-500 font-normal text-sm">({bucketSessions.length})</span></h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-neutral-700 text-neutral-400">
                                                    <th className="text-left py-3 px-2 font-medium">Date</th>
                                                    <th className="text-left py-3 px-2 font-medium">IP Address</th>
                                                    <th className="text-right py-3 px-2 font-medium">Time on Site</th>
                                                    <th className="text-right py-3 px-2 font-medium">Converted</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bucketSessions.map((s, i) => {
                                                    const mins = Math.floor(s.timeOnSiteSec / 60)
                                                    const secs = s.timeOnSiteSec % 60
                                                    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
                                                    return (
                                                        <tr key={i} className="border-b border-neutral-800">
                                                            <td className="py-3 px-2 text-white text-xs">{new Date(s.date).toLocaleString()}</td>
                                                            <td className="py-3 px-2 text-white font-mono text-xs">{s.ip}</td>
                                                            <td className="py-3 px-2 text-right text-white">{timeStr}</td>
                                                            <td className="py-3 px-2 text-right">
                                                                {s.converted
                                                                    ? <span className="bg-green-500/20 text-green-400 text-xs font-medium px-2 py-0.5 rounded">Yes</span>
                                                                    : <span className="bg-neutral-800 text-neutral-500 text-xs font-medium px-2 py-0.5 rounded">No</span>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* ─── TAB 6: JOURNEY ENGINE ─── */}
                {activeTab === 'journeys' && (
                    <div className="space-y-6">
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-medium text-white">Journey Engine</h3>
                                    <p className="text-sm text-neutral-500">Configure full-funnel A/B journeys. Each journey controls homepage, checkout, popup, and pricing.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setJourneyJsonMode(!journeyJsonMode)
                                            if (!journeyJsonMode) setJourneyJson(JSON.stringify(journeys, null, 2))
                                        }}
                                        className="text-xs text-blue-400 hover:text-blue-300 underline"
                                    >
                                        {journeyJsonMode ? 'Visual Editor' : 'JSON Editor'}
                                    </button>
                                </div>
                            </div>

                            {journeyJsonMode ? (
                                /* JSON Editor Mode */
                                <div>
                                    <textarea
                                        value={journeyJson}
                                        onChange={(e) => setJourneyJson(e.target.value)}
                                        rows={15}
                                        className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white text-sm outline-none focus:border-blue-500 font-mono leading-relaxed resize-y"
                                        placeholder='[{"id":"journey_a","name":"Standard","weight":50,"homepage":"/premium-offer","checkout":"/customize","popup":"shipping","products":[{"id":"full","price":"$1,199","badge":"Most Popular"},{"id":"solo","price":"$1,099"}]}]'
                                    />
                                    <button
                                        onClick={async () => {
                                            try {
                                                const parsed = JSON.parse(journeyJson)
                                                setJourneys(parsed)
                                                setJourneySaving(true)
                                                const res = await updateJourneyConfigs(parsed)
                                                setJourneyMessage(res.success ? 'Journeys saved from JSON!' : 'Failed to save')
                                                setJourneySaving(false)
                                                setTimeout(() => setJourneyMessage(''), 3000)
                                            } catch {
                                                setJourneyMessage('Invalid JSON')
                                                setTimeout(() => setJourneyMessage(''), 3000)
                                            }
                                        }}
                                        disabled={journeySaving}
                                        className="mt-3 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors"
                                    >
                                        {journeySaving ? 'Saving...' : 'Save JSON'}
                                    </button>
                                </div>
                            ) : (
                                /* Visual Editor Mode */
                                <div className="space-y-4">
                                    {journeys.map((j, idx) => (
                                        <div key={idx} className="bg-black/40 p-4 rounded-lg border border-neutral-800">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-mono text-blue-400">?journey={j.id}</span>
                                                <button
                                                    onClick={() => {
                                                        const updated = journeys.filter((_, i) => i !== idx)
                                                        setJourneys(updated)
                                                    }}
                                                    className="text-red-400 hover:text-red-300 text-xs"
                                                >
                                                    ✕ Remove
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs text-neutral-500 mb-1">Journey ID</label>
                                                    <input value={j.id} onChange={(e) => { const u = [...journeys]; u[idx] = { ...u[idx], id: e.target.value }; setJourneys(u) }} className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1.5 text-white text-sm outline-none focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-neutral-500 mb-1">Name</label>
                                                    <input value={j.name} onChange={(e) => { const u = [...journeys]; u[idx] = { ...u[idx], name: e.target.value }; setJourneys(u) }} className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1.5 text-white text-sm outline-none focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-neutral-500 mb-1">Weight (%)</label>
                                                    <input type="number" value={j.weight} onChange={(e) => { const u = [...journeys]; u[idx] = { ...u[idx], weight: parseInt(e.target.value) || 0 }; setJourneys(u) }} className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1.5 text-white text-sm outline-none focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-neutral-500 mb-1">Homepage Path</label>
                                                    <input value={j.homepage} onChange={(e) => { const u = [...journeys]; u[idx] = { ...u[idx], homepage: e.target.value }; setJourneys(u) }} placeholder="/premium-offer" className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1.5 text-white text-sm outline-none focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-neutral-500 mb-1">Checkout Path</label>
                                                    <input value={j.checkout} onChange={(e) => { const u = [...journeys]; u[idx] = { ...u[idx], checkout: e.target.value }; setJourneys(u) }} placeholder="/customize" className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1.5 text-white text-sm outline-none focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-neutral-500 mb-1">Popup Type</label>
                                                    <select value={j.popup} onChange={(e) => { const u = [...journeys]; u[idx] = { ...u[idx], popup: e.target.value }; setJourneys(u) }} className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1.5 text-white text-sm outline-none focus:border-blue-500">
                                                        <option value="shipping">Free Shipping</option>
                                                        <option value="pdf">PDF Guide</option>
                                                        <option value="discount">$300 Off</option>
                                                        <option value="discount_44">44% Off</option>
                                                        <option value="accessory_25">25% Accessory</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Products Editor */}
                                            <div className="mt-3 pt-3 border-t border-neutral-800">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Products</span>
                                                    <button
                                                        onClick={() => {
                                                            const u = [...journeys]
                                                            const products = [...(u[idx].products || [])]
                                                            products.push({ id: 'full', price: '$1,199' })
                                                            u[idx] = { ...u[idx], products }
                                                            setJourneys(u)
                                                        }}
                                                        className="text-xs text-blue-400 hover:text-blue-300"
                                                    >
                                                        + Add Product
                                                    </button>
                                                </div>
                                                {(j.products || []).length === 0 && (
                                                    <p className="text-xs text-neutral-600 italic">No products defined — will use global defaults</p>
                                                )}
                                                {(j.products || []).map((product: JourneyProduct, pIdx: number) => (
                                                    <div key={pIdx} className="grid grid-cols-5 gap-2 mb-2 items-end">
                                                        <div>
                                                            <label className="block text-[10px] text-neutral-600 mb-0.5">Product</label>
                                                            <select value={product.id} onChange={(e) => { const u = [...journeys]; const p = [...(u[idx].products || [])]; p[pIdx] = { ...p[pIdx], id: e.target.value }; u[idx] = { ...u[idx], products: p }; setJourneys(u) }} className="w-full bg-neutral-800 border border-neutral-700 rounded px-1.5 py-1 text-white text-xs outline-none focus:border-blue-500">
                                                                <option value="reservation">Lock My Spot ($99)</option>
                                                                <option value="reserve50">Reserve 50%</option>
                                                                <option value="solo">Keyboard Only</option>
                                                                <option value="full">Bundle</option>
                                                                <option value="signature">Signature</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] text-neutral-600 mb-0.5">Price</label>
                                                            <input value={product.price} onChange={(e) => { const u = [...journeys]; const p = [...(u[idx].products || [])]; p[pIdx] = { ...p[pIdx], price: e.target.value }; u[idx] = { ...u[idx], products: p }; setJourneys(u) }} placeholder="$1,199" className="w-full bg-neutral-800 border border-neutral-700 rounded px-1.5 py-1 text-white text-xs outline-none focus:border-blue-500" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] text-neutral-600 mb-0.5">Strikethrough</label>
                                                            <input value={product.originalPrice || ''} onChange={(e) => { const u = [...journeys]; const p = [...(u[idx].products || [])]; p[pIdx] = { ...p[pIdx], originalPrice: e.target.value || undefined }; u[idx] = { ...u[idx], products: p }; setJourneys(u) }} placeholder="$1,499" className="w-full bg-neutral-800 border border-neutral-700 rounded px-1.5 py-1 text-white text-xs outline-none focus:border-blue-500" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] text-neutral-600 mb-0.5">Discount Code</label>
                                                            <input value={product.discountCode || ''} onChange={(e) => { const u = [...journeys]; const p = [...(u[idx].products || [])]; p[pIdx] = { ...p[pIdx], discountCode: e.target.value || undefined }; u[idx] = { ...u[idx], products: p }; setJourneys(u) }} placeholder="FLASH44" className="w-full bg-neutral-800 border border-neutral-700 rounded px-1.5 py-1 text-white text-xs outline-none focus:border-blue-500" />
                                                        </div>
                                                        <button
                                                            onClick={() => { const u = [...journeys]; const p = [...(u[idx].products || [])]; p.splice(pIdx, 1); u[idx] = { ...u[idx], products: p }; setJourneys(u) }}
                                                            className="text-red-400 hover:text-red-300 text-xs pb-1"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => setJourneys([...journeys, { id: `journey_${String.fromCharCode(97 + journeys.length)}`, name: 'New Journey', weight: 50, homepage: '/premium-offer', checkout: '/customize', popup: 'shipping', products: [{ id: 'full', price: '$1,199', badge: 'Most Popular' }, { id: 'solo', price: '$1,099' }] }])}
                                        className="w-full border border-dashed border-neutral-700 hover:border-neutral-500 text-neutral-500 hover:text-neutral-300 text-sm font-medium py-2.5 rounded-lg transition-colors"
                                    >
                                        + Add Journey
                                    </button>
                                </div>
                            )}

                            {/* Save */}
                            <button
                                onClick={async () => {
                                    setJourneySaving(true)
                                    setJourneyMessage('')
                                    const res = await updateJourneyConfigs(journeys)
                                    setJourneyMessage(res.success ? 'Journeys saved!' : 'Failed to save')
                                    setJourneySaving(false)
                                    setJourneyJson(JSON.stringify(journeys, null, 2))
                                    setTimeout(() => setJourneyMessage(''), 3000)
                                }}
                                disabled={journeySaving}
                                className={`w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors ${journeyJsonMode ? 'hidden' : 'mt-4'}`}
                            >
                                {journeySaving ? 'Saving...' : 'Save Journeys'}
                            </button>

                            {journeyMessage && (
                                <div className={`mt-3 p-3 rounded-lg text-sm text-center font-medium ${journeyMessage.includes('saved') || journeyMessage.includes('Saved') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {journeyMessage}
                                </div>
                            )}

                            {/* How to Use */}
                            <div className="mt-6 p-4 bg-neutral-950 rounded-lg border border-neutral-800">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">How It Works</h4>
                                <ul className="text-xs text-neutral-500 space-y-1.5">
                                    <li>• Each journey controls the full funnel: homepage → popup → pricing → checkout</li>
                                    <li>• Traffic is split by weight (e.g., 50/50 for two journeys)</li>
                                    <li>• Force a journey via ad URL: <code className="text-blue-400">dreamplaypianos.com?journey=journey_a</code></li>
                                    <li>• Search engines always see the &quot;standard&quot; price tier (bot bypass)</li>
                                    <li>• Journey ID is tracked in analytics for ROAS calculation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

            </div >
        </div >
    )
}
