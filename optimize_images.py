#!/usr/bin/env python3
"""
Image optimization script for minilabubu website
Converts PNG to WebP and creates optimized versions
"""

import os
from PIL import Image
import glob

def optimize_image(input_path, quality=85, target_width=510, target_height=680):
    """
    Optimize a single image
    """
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for WebP compatibility)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create a white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize to target dimensions while maintaining aspect ratio
            img.thumbnail((target_width, target_height), Image.Resampling.LANCZOS)
            
            # Generate WebP filename
            base_name = os.path.splitext(input_path)[0]
            webp_path = f"{base_name}.webp"
            
            # Save as WebP with optimization
            img.save(webp_path, 'WebP', quality=quality, optimize=True)
            
            # Get file sizes
            original_size = os.path.getsize(input_path)
            webp_size = os.path.getsize(webp_path)
            
            print(f"✅ {os.path.basename(input_path)}")
            print(f"   Original: {original_size:,} bytes")
            print(f"   WebP: {webp_size:,} bytes")
            print(f"   Saved: {original_size - webp_size:,} bytes ({((original_size - webp_size) / original_size * 100):.1f}%)")
            print()
            
            return True
            
    except Exception as e:
        print(f"❌ Error processing {input_path}: {e}")
        return False

def main():
    """
    Main optimization function
    """
    print("🖼️  Starting image optimization...")
    print("=" * 50)
    
    # Find all PNG files
    png_files = glob.glob("*.png")
    
    if not png_files:
        print("No PNG files found in current directory")
        return
    
    total_original = 0
    total_webp = 0
    successful = 0
    
    for png_file in png_files:
        # Skip Zone.Identifier files
        if 'Zone.Identifier' in png_file:
            continue
            
        original_size = os.path.getsize(png_file)
        total_original += original_size
        
        if optimize_image(png_file):
            successful += 1
            webp_file = os.path.splitext(png_file)[0] + '.webp'
            if os.path.exists(webp_file):
                total_webp += os.path.getsize(webp_file)
    
    print("=" * 50)
    print(f"📊 Optimization Summary:")
    print(f"   Files processed: {successful}/{len(png_files)}")
    print(f"   Total original size: {total_original:,} bytes ({total_original/1024/1024:.1f} MB)")
    print(f"   Total WebP size: {total_webp:,} bytes ({total_webp/1024/1024:.1f} MB)")
    print(f"   Total saved: {total_original - total_webp:,} bytes ({total_original - total_webp/1024/1024:.1f} MB)")
    print(f"   Overall compression: {((total_original - total_webp) / total_original * 100):.1f}%")

if __name__ == "__main__":
    main()