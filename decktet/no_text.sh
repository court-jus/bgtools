# Remove txt :

convert "$1" \( -size 750x1050 xc:none -fill black -draw 'rectangle 50,500 120,915 rectangle 630,135 700,550' \) -alpha Set -compose Dst_Out -composite no_text/"$1"
