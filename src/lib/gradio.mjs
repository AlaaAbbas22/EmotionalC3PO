import { Client } from "@gradio/client";


async function image_generat(prompt){
    const client = await Client.connect("DamarJati/FLUX.1-RealismLora");
    const result = await client.predict("/run_lora", { 		
            prompt: prompt, 		
            cfg_scale: 3.2, 		
            steps: 10, 		
            randomize_seed: true, 		
            seed: 0, 		
            width: 256, 		
            height: 256, 		
            lora_scale: 0.85, 
    });

    

    console.log(result.data[0].url)
    return result.data[0].url;
}



async function gen_3d(prompt){    
    const client = await Client.connect("hysts/Shap-E");
    const result = await client.predict("/text-to-3d", { 		
            prompt, 		
            seed: 0, 		
            guidance_scale: 15, 		
            num_inference_steps: 64, 
    });

    console.log(result.data[0].url);
    return result.data[0].url;
}


export {gen_3d, image_generat}