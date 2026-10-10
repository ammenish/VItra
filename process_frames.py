import os
from PIL import Image, ImageDraw

input_dir = r"C:\Users\Manish Bisai\.gemini\antigravity-ide\scratch\eye-visualization\original_frames"
output_dir = r"C:\Users\Manish Bisai\.gemini\antigravity-ide\scratch\eye-visualization\app\public\eye-frames-clean"

os.makedirs(output_dir, exist_ok=True)

files = sorted([f for f in os.listdir(input_dir) if f.endswith('.png')])

for i, filename in enumerate(files):
    frame_number = i + 1
    input_path = os.path.join(input_dir, filename)
    output_filename = f"frame_{frame_number:04d}.webp"
    output_path = os.path.join(output_dir, output_filename)
    
    with Image.open(input_path) as img:
        # The background is black. The watermark is at the bottom right.
        # We draw a black rectangle over the bottom right corner.
        width, height = img.size
        draw = ImageDraw.Draw(img)
        # 250x250 square at bottom right
        draw.rectangle(
            [width - 250, height - 250, width, height],
            fill=(0, 0, 0)
        )
        
        img.save(output_path, "WEBP", quality=90)
    
    if frame_number % 20 == 0 or frame_number == len(files):
        print(f"Processed {frame_number}/{len(files)} frames")

print(f"All done! Saved to {output_dir}")
