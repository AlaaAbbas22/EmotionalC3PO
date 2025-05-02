import { gen_3d } from "@/lib/gradio.mjs";

export async function POST(req) {
  try {
    const data = await req.json();
    const id = data.id || 1; // Default to 1 if id is not provided
    
    // In a real implementation, you would store this data in a database
    // For now, we'll use a simple in-memory storage via global variable
    if (!global.chatData) {
      global.chatData = {};
    }
    
    // Store the transcript and other data
    global.chatData[id] = {
      ...data,
      timestamp: new Date().toISOString(),
      image:image_generat( `prompt :You are a visual storyteller. Your task is to turn a user's internal emotional landscape into a vivid scene prompt suitable for an AI image generation model.

Use the information below to build a grounded, coherent, and poetic image prompt that captures the user’s internal state as a metaphorical scene.

---

🪞 User's Reflection Data

- Scene Title: "{{scene_title}}"
- Emotional Mood: "{{ground_emotion}}"
- Body Sensation Location: "{{body_locus}}"
- Cognitive Load: "{{cognitive_load}}"
- Motion of Emotion: "{{sketch_motion}}"
- Shape of Emotion: "{{sketch_shape}}"
- Temperature Descriptor: "{{temp_descriptor}}"
- Texture Descriptor: "{{texture_descriptor}}"
- Colors Present: {{color_palette}}
- Familiarity: "{{temporal_tag}}"
- Internal Scene Description: "{{scene_description}}"
- Metaphor Summary: "{{metaphor_prompt}}"

---

🎨 Task:

Generate a single poetic and coherent sentence (or 2 at most) that describes this internal world as a visual scene.

It should include:
- Landscape or setting
- Emotional tone
- Color usage
- Texture or lighting
- Motion, if any
- Optional metaphorical object or figure

This prompt will be used to generate a visual artwork using an image model. Be expressive, but keep it grounded in the data.

---

🎯 Output Prompt Example:

“A glowing teal orb, rough like stone but warm to the touch, floats in a foggy mountain valley. Wind swirls gently around it, as if carrying whispered thoughts from a storm that passed.”

---

✏️ Now generate the scene:
"`+new String(data)),
img_3d:gen_3d(`prompt :You are a visual storyteller. Your task is to turn a user's internal emotional landscape into a vivid scene prompt suitable for an AI image generation model.

Use the information below to build a grounded, coherent, and poetic image prompt that captures the user’s internal state as a metaphorical scene.

---

🪞 User's Reflection Data

- Scene Title: "{{scene_title}}"
- Emotional Mood: "{{ground_emotion}}"
- Body Sensation Location: "{{body_locus}}"
- Cognitive Load: "{{cognitive_load}}"
- Motion of Emotion: "{{sketch_motion}}"
- Shape of Emotion: "{{sketch_shape}}"
- Temperature Descriptor: "{{temp_descriptor}}"
- Texture Descriptor: "{{texture_descriptor}}"
- Colors Present: {{color_palette}}
- Familiarity: "{{temporal_tag}}"
- Internal Scene Description: "{{scene_description}}"
- Metaphor Summary: "{{metaphor_prompt}}"

---

🎨 Task:

Generate a single poetic and coherent sentence (or 2 at most) that describes this internal world as a visual scene.

It should include:
- Landscape or setting
- Emotional tone
- Color usage
- Texture or lighting
- Motion, if any
- Optional metaphorical object or figure

This prompt will be used to generate a visual artwork using an image model. Be expressive, but keep it grounded in the data.

---

🎯 Output Prompt Example:

“A glowing teal orb, rough like stone but warm to the touch, floats in a foggy mountain valley. Wind swirls gently around it, as if carrying whispered thoughts from a storm that passed.”

---

✏️ Now generate the scene:
"`+new String(data))
    };
    
    return new Response(JSON.stringify({ 
      success: true, 
      id,
      message: "Chat data updated successfully"
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}