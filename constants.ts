
import type { Category, Field, Purpose, Language, CategoryId } from './types';

interface PromptConfig {
    categories: Category[];
    purposes: Record<string, Purpose[]>;
    fields: Record<string, Field>;
    templates: Record<CategoryId, Record<Language, string>>;
    semanticNegatives: Record<Language, { prefix: string; template: string }>;
    i18n: Record<Language, any>;
}

export const promptConfig: PromptConfig = {
    categories: [
        { id: 'photorealistic', name_ko: '사진 실사', name_en: 'Photorealistic', type: 'creation', fields: ['subject', 'action', 'environment', 'shot_type', 'camera_lens', 'lighting', 'mood', 'key_detail', 'aspect_ratio', 'semantic_negative'] },
        { id: 'illustration', name_ko: '일러스트/스티커', name_en: 'Illustration/Sticker', type: 'creation', fields: ['subject', 'style_illustration', 'features', 'color_palette', 'line_shading', 'background_simple', 'semantic_negative'] },
        { id: 'text_logo', name_ko: '텍스트/로고', name_en: 'Text/Logo', type: 'creation', fields: ['image_type_logo', 'brand_concept', 'text_to_render', 'font_tone', 'style_logo', 'color_scheme', 'semantic_negative'] },
        { id: 'product', name_ko: '제품/상업 촬영', name_en: 'Product/Commercial', type: 'creation', fields: ['product_name', 'background_product', 'light_setting', 'angle', 'key_feature_product', 'focus_detail', 'aspect_ratio', 'semantic_negative'] },
        { id: 'minimalist', name_ko: '미니멀/네거티브 스페이스', name_en: 'Minimalist/Negative Space', type: 'creation', fields: ['subject_minimal', 'frame_position', 'background_color', 'lighting_soft', 'aspect_ratio', 'semantic_negative'] },
        { id: 'comic', name_ko: '연재/만화 패널', name_en: 'Comic Panel', type: 'creation', fields: ['art_style_comic', 'character_action', 'setting_comic', 'dialogue_caption', 'lighting_mood_comic', 'aspect_ratio', 'semantic_negative'] },
        { id: 'edit_add_remove', name_ko: '추가/삭제', name_en: 'Add/Remove', type: 'editing', fields: ['image_upload', 'edit_action', 'element_to_edit', 'integration_method'] },
        { id: 'edit_inpaint', name_ko: '인페인팅', name_en: 'Inpainting', type: 'editing', fields: ['image_upload', 'target_element', 'new_element'] },
        { id: 'edit_style_transfer', name_ko: '스타일 변환', name_en: 'Style Transfer', type: 'editing', fields: ['image_upload', 'subject', 'art_style_transfer', 'style_elements'] },
        { id: 'edit_composite', name_ko: '멀티이미지 합성', name_en: 'Multi-image Composite', type: 'editing', fields: ['image_upload_multi', 'element_from_img1', 'element_from_img2', 'final_scene_desc'] },
    ],
    purposes: {
        photorealistic: [{id:'art', ko:'예술 사진', en:'Artistic Photo'}, {id:'stock', ko:'스톡 이미지', en:'Stock Image'}],
        illustration: [{id:'sticker', ko:'스티커', en:'Sticker'}, {id:'tshirt', ko:'티셔츠 디자인', en:'T-shirt Design'}, {id:'web', ko:'웹툰/웹소설 삽화', en:'Web Illustration'}],
        text_logo: [{id:'logo', ko:'로고', en:'Logo'}, {id:'poster', ko:'포스터/배너', en:'Poster/Banner'}],
        product: [{id:'ecommerce', ko:'전자상거래', en:'E-commerce'}, {id:'ad', ko:'광고 캠페인', en:'Ad Campaign'}],
        minimalist: [{id:'background', ko:'배경화면', en:'Wallpaper'}, {id:'presentation', ko:'프레젠테이션 배경', en:'Presentation Background'}],
        comic: [{id:'storyboard', ko:'스토리보드', en:'Storyboard'}, {id:'webtoon_panel', ko:'웹툰 패널', en:'Webtoon Panel'}]
    },
    fields: {
        subject: { type: 'text', ko: '주 피사체', en: 'Main Subject', placeholder_ko: '예: 커피를 마시는 우주비행사', placeholder_en: 'e.g., an astronaut drinking coffee', ai: true },
        action: { type: 'text', ko: '행동/표정', en: 'Action/Expression', placeholder_ko: '예: 평화롭게 창밖을 바라보며', placeholder_en: 'e.g., peacefully looking out a window', ai: true },
        environment: { type: 'text', ko: '환경 (장소/시간대)', en: 'Environment (Place/Time)', placeholder_ko: '예: 해질녘 화성의 우주 기지', placeholder_en: 'e.g., a Mars base at sunset', ai: true },
        shot_type: { type: 'select', ko: '샷 타입', en: 'Shot Type', options: { 'close_up': {ko:'클로즈업 샷', en:'Close-up shot'}, 'medium_shot': {ko:'미디엄 샷', en:'Medium shot'}, 'full_shot': {ko:'풀 샷', en:'Full shot'}, 'drone_shot': {ko:'드론 샷', en:'Drone shot'} } },
        camera_lens: { type: 'select', ko: '카메라/렌즈', en: 'Camera/Lens', options: { 'telephoto': {ko:'망원 렌즈', en:'Telephoto lens'}, 'wide_angle': {ko:'광각 렌즈', en:'Wide-angle lens'}, '50mm': {ko:'50mm 표준 렌즈', en:'50mm standard lens'}, 'macro': {ko:'매크로 렌즈', en:'Macro lens'} } },
        lighting: { type: 'select', ko: '조명', en: 'Lighting', options: { 'golden_hour': {ko:'골든아워', en:'Golden hour'}, 'soft_light': {ko:'부드러운 스튜디오 조명', en:'Soft studio light'}, 'hard_light': {ko:'강한 직사광선', en:'Hard direct sunlight'}, 'cinematic': {ko:'영화적 조명', en:'Cinematic lighting'} } },
        mood: { type: 'text', ko: '분위기', en: 'Mood', placeholder_ko: '예: 고요하고 명상적인', placeholder_en: 'e.g., calm and meditative', ai: true },
        key_detail: { type: 'text', ko: '강조할 디테일', en: 'Key Detail to Emphasize', placeholder_ko: '예: 헬멧에 비친 별들', placeholder_en: 'e.g., the stars reflected on the helmet', ai: true },
        aspect_ratio: { type: 'select', ko: '종횡비', en: 'Aspect Ratio', options: { '16:9': {ko:'16:9 (와이드스크린)', en:'16:9 (Widescreen)'}, '1:1': {ko:'1:1 (정사각형)', en:'1:1 (Square)'}, '9:16': {ko:'9:16 (세로)', en:'9:16 (Portrait)'}, '4:3': {ko:'4:3 (표준)', en:'4:3 (Standard)'} } },
        semantic_negative: { type: 'text', ko: '제외할 요소 (의미적 네거티브)', en: 'Elements to Exclude (Semantic Negative)', placeholder_ko: '예: 자동차, 사람들 (긍정 서술로 변환됩니다)', placeholder_en: 'e.g., cars, people (will be converted to positive description)' },
        style_illustration: { type: 'select', ko: '일러스트 스타일', en: 'Illustration Style', options: { 'flat': {ko:'플랫 디자인', en:'Flat design'}, 'watercolor': {ko:'수채화', en:'Watercolor'}, 'pixel_art': {ko:'픽셀 아트', en:'Pixel art'}, 'vector': {ko:'벡터 아트', en:'Vector art'} } },
        features: { type: 'text', ko: '특징', en: 'Features', placeholder_ko: '예: 반짝이는 눈, 굵은 외곽선', placeholder_en: 'e.g., sparkling eyes, bold outlines', ai: true },
        color_palette: { type: 'text', ko: '컬러 팔레트', en: 'Color Palette', placeholder_ko: '예: 파스텔 톤', placeholder_en: 'e.g., pastel colors', ai: true },
        line_shading: { type: 'text', ko: '선/음영', en: 'Line/Shading', placeholder_ko: '예: 부드러운 그라데이션 음영', placeholder_en: 'e.g., soft gradient shading', ai: true },
        background_simple: { type: 'select', ko: '배경', en: 'Background', options: {'white': {ko:'흰색 배경 (필수)', en:'White background (required)'}, 'transparent': {ko:'투명 배경', en:'Transparent background'}} },
        image_type_logo: { type: 'select', ko: '이미지 타입', en: 'Image Type', options: {'logo': {ko:'로고', en:'Logo'}, 'icon': {ko:'아이콘', en:'Icon'}, 'emblem': {ko:'엠블럼', en:'Emblem'}} },
        brand_concept: { type: 'text', ko: '브랜드/컨셉', en: 'Brand/Concept', placeholder_ko: '예: 친환경 기술 스타트업', placeholder_en: 'e.g., an eco-friendly tech startup', ai: true },
        text_to_render: { type: 'text', ko: '렌더링할 문구', en: 'Text to Render', placeholder_ko: '예: "NATURE TECH"', placeholder_en: 'e.g., "NATURE TECH"' },
        font_tone: { type: 'text', ko: '폰트 톤', en: 'Font Tone', placeholder_ko: '예: 현대적이고 깔끔한 산세리프', placeholder_en: 'e.g., modern and clean sans-serif', ai: true },
        style_logo: { type: 'text', ko: '디자인 스타일', en: 'Design Style', placeholder_ko: '예: 미니멀리즘, 기하학적', placeholder_en: 'e.g., minimalist, geometric', ai: true },
        color_scheme: { type: 'text', ko: '컬러 스킴', en: 'Color Scheme', placeholder_ko: '예: 녹색과 회색', placeholder_en: 'e.g., green and gray', ai: true },
        product_name: { type: 'text', ko: '제품명', en: 'Product Name', placeholder_ko: '예: 프리미엄 유기농 핸드크림', placeholder_en: 'e.g., a premium organic hand cream' },
        background_product: { type: 'select', ko: '배경', en: 'Background', options: {'white_studio': {ko:'깔끔한 흰색 스튜디오 배경', en:'Clean white studio background'}, 'marble': {ko:'고급스러운 대리석 위', en:'On a luxurious marble surface'}, 'nature': {ko:'자연광이 드는 나뭇잎 배경', en:'Natural light with leaves in background'}} },
        light_setting: { type: 'select', ko: '조명 세팅', en: 'Light Setting', options: {'softbox': {ko:'소프트박스 조명', en:'Softbox lighting'}, 'ring_light': {ko:'링 라이트', en:'Ring light'}, 'natural_window': {ko:'창문 자연광', en:'Natural window light'}} },
        angle: { type: 'select', ko: '각도', en: 'Angle', options: {'front': {ko:'정면 샷', en:'Front shot'}, 'top_down': {ko:'탑다운 샷', en:'Top-down shot'}, '45_degree': {ko:'45도 각도 샷', en:'45-degree angle shot'}} },
        key_feature_product: { type: 'text', ko: '보여줄 핵심 포인트', en: 'Key Feature to Showcase', placeholder_ko: '예: 제품의 부드러운 질감', placeholder_en: 'e.g., the creamy texture of the product' },
        focus_detail: { type: 'text', ko: '집중할 디테일', en: 'Detail to Focus On', placeholder_ko: '예: 병의 엠보싱 로고', placeholder_en: 'e.g., the embossed logo on the bottle' },
        subject_minimal: { type: 'text', ko: '단일 피사체', en: 'Single Subject', placeholder_ko: '예: 붉은색 나뭇잎 하나', placeholder_en: 'e.g., a single red leaf' },
        frame_position: { type: 'select', ko: '프레임 내 위치', en: 'Position in Frame', options: {'center': {ko:'정중앙', en:'Center'}, 'bottom_right': {ko:'우측 하단', en:'Bottom right'}, 'top_left': {ko:'좌측 상단', en:'Top left'}} },
        background_color: { type: 'text', ko: '배경 캔버스', en: 'Background Canvas', placeholder_ko: '예: 광활하고 텅 빈 베이지색', placeholder_en: 'e.g., vast, empty beige' },
        lighting_soft: { type: 'select', ko: '조명', en: 'Lighting', options: {'soft': {ko:'부드러운 조명', en:'Soft lighting'}, 'diffused': {ko:'분산광', en:'Diffused light'}} },
        art_style_comic: { type: 'text', ko: '아트 스타일', en: 'Art Style', placeholder_ko: '예: 미국 코믹스 스타일', placeholder_en: 'e.g., American comics style' },
        character_action: { type: 'text', ko: '전경: 캐릭터와 행동', en: 'Foreground: Character & Action', placeholder_ko: '예: 탐정이 놀란 표정으로 서류를 본다', placeholder_en: 'e.g., a detective looking at a file with a surprised expression', ai: true },
        setting_comic: { type: 'text', ko: '배경: 세팅', en: 'Background: Setting', placeholder_ko: '예: 어둡고 비 내리는 밤의 사무실', placeholder_en: 'e.g., a dark, rainy office at night', ai: true },
        dialogue_caption: { type: 'text', ko: '대사/캡션', en: 'Dialogue/Caption', placeholder_ko: '예: "이럴 수가…!"', placeholder_en: 'e.g., "This can\'t be...!"' },
        lighting_mood_comic: { type: 'text', ko: '조명과 분위기', en: 'Lighting & Mood', placeholder_ko: '예: 블라인드 사이로 들어오는 빛이 극적인 분위기를 만든다', placeholder_en: 'e.g., light through the blinds creates a dramatic mood', ai: true },
        image_upload: { type: 'file', ko: '이미지 업로드', en: 'Image Upload' },
        image_upload_multi: { type: 'file', ko: '이미지 업로드 (다중 선택)', en: 'Image Upload (Multiple)', multiple: true },
        edit_action: { type: 'select', ko: '수행할 작업', en: 'Action to Perform', options: {'add': {ko:'추가', en:'add'}, 'remove': {ko:'삭제', en:'remove'}, 'modify': {ko:'수정', en:'modify'}} },
        element_to_edit: { type: 'text', ko: '대상 요소', en: 'Element to Edit', placeholder_ko: '예: 강아지, 배경의 나무', placeholder_en: 'e.g., the dog, a tree in the background' },
        integration_method: { type: 'text', ko: '자연스러운 통합 방식', en: 'Natural Integration Method', placeholder_ko: '예: 주변 조명과 그림자를 일치시켜주세요', placeholder_en: 'e.g., ensure it matches the surrounding light and shadow' },
        target_element: { type: 'text', ko: '변경할 특정 요소', en: 'Specific Element to Change', placeholder_ko: '예: 파란색 자동차', placeholder_en: 'e.g., the blue car' },
        new_element: { type: 'text', ko: '새로운 요소', en: 'New Element', placeholder_ko: '예: 빨간색 스포츠카', placeholder_en: 'e.g., a red sports car' },
        art_style_transfer: { type: 'text', ko: '적용할 예술 스타일', en: 'Artistic Style to Apply', placeholder_ko: '예: 반 고흐의 스타일', placeholder_en: 'e.g., the style of Van Gogh' },
        style_elements: { type: 'text', ko: '보존/강조할 스타일 요소', en: 'Style Elements to Preserve/Emphasize', placeholder_ko: '예: 굵은 붓 터치와 생생한 색감', placeholder_en: 'e.g., thick brushstrokes and vivid colors' },
        element_from_img1: { type: 'text', ko: '이미지1에서 가져올 요소', en: 'Element from Image 1', placeholder_ko: '예: 고양이의 얼굴', placeholder_en: 'e.g., the cat\'s face' },
        element_from_img2: { type: 'text', ko: '이미지2에서 가져올 요소', en: 'Element from Image 2', placeholder_ko: '예: 우주비행사의 헬멧', placeholder_en: 'e.g., the astronaut\'s helmet' },
        final_scene_desc: { type: 'text', ko: '최종 장면 설명', en: 'Final Scene Description', placeholder_ko: '예: 우주비행사 헬멧을 쓴 고양이', placeholder_en: 'e.g., a cat wearing an astronaut\'s helmet', ai: true },
    },
    templates: {
        photorealistic: {
            ko: "([purpose]) [shot_type]의 [subject] 사진. [action]을(를) 하고 있으며, 배경은 [environment]입니다. [lighting]이(가) 장면을 비추어 [mood] 분위기를 자아냅니다. [camera_lens](으)로 촬영하여 [key_detail]을(를) 강조합니다. 종횡비는 [aspect_ratio]입니다.[의미적_네거티브]",
            en: "([purpose]) A photorealistic [shot_type] of [subject], [action], set in [environment]. The scene is illuminated by [lighting], creating a [mood] atmosphere. Captured with [camera_lens], emphasizing [key_detail]. Aspect ratio: [aspect_ratio].[semantic_negative]"
        },
        illustration: {
            ko: "([purpose]) [style_illustration] 스타일의 [subject] 스티커. [features]이(가) 특징이며, [color_palette]를 사용합니다. 선과 음영은 [line_shading] 스타일입니다. 배경은 반드시 [background_simple]이어야 합니다.[의미적_네거티브]",
            en: "([purpose]) A [style_illustration] sticker of [subject], featuring [features] and a [color_palette]. [line_shading]. The background must be [background_simple].[semantic_negative]"
        },
         text_logo: {
            ko: "([purpose]) [brand_concept]을(를) 위한 [image_type_logo]. ‘[text_to_render]’라는 텍스트가 [font_tone]으로 표현됩니다. 디자인은 [style_logo]이며, [color_scheme]을 사용합니다.[의미적_네거티브]",
            en: "([purpose]) Create a [image_type_logo] for [brand_concept] with the text ‘[text_to_render]’ in a [font_tone]. The design is [style_logo], with a [color_scheme].[semantic_negative]"
        },
        product: {
            ko: "([purpose]) [background_product] 위에 놓인 [product_name]의 고해상도 스튜디오 제품 사진. [light_setting]을(를) 사용하여 [key_feature_product]을(를) 보여줍니다. [angle]에서 촬영하여 [focus_detail]을(를) 강조합니다. 극사실적이어야 합니다. 종횡비는 [aspect_ratio]입니다.[의미적_네거티브]",
            en: "([purpose]) High-resolution, studio-lit product photo of [product_name] on [background_product]. [light_setting] to showcase [key_feature_product]. [angle] to highlight [focus_detail]. Ultra-realistic. Aspect ratio: [aspect_ratio].[semantic_negative]"
        },
        minimalist: {
            ko: "([purpose]) 프레임의 [frame_position]에 단일 [subject_minimal]이(가) 있는 미니멀한 구성. 네거티브 스페이스를 위해 [background_color] 캔버스를 사용합니다. [lighting_soft] 조명을 사용합니다. 종횡비는 [aspect_ratio]입니다.[의미적_네거티브]",
            en: "([purpose]) A minimalist composition with a single [subject_minimal] at [frame_position] of the frame. Vast, empty [background_color] canvas for negative space. [lighting_soft]. Aspect ratio: [aspect_ratio].[semantic_negative]"
        },
        comic: {
            ko: "([purpose]) [art_style_comic] 스타일의 단일 만화 패널. 전경: [character_action]. 배경: [setting_comic]. 대사/캡션: ‘[dialogue_caption]’. [lighting_mood_comic]. 종횡비는 [aspect_ratio]입니다.[의미적_네거티브]",
            en: "([purpose]) A single comic panel in [art_style_comic]. Foreground: [character_action]. Background: [setting_comic]. Dialogue/Caption: ‘[dialogue_caption]’. [lighting_mood_comic]. Aspect ratio: [aspect_ratio].[semantic_negative]"
        },
        edit_add_remove: {
            ko: "제공된 이미지에서 [element_to_edit]을(를) [edit_action]해주세요. 변경 사항이 [integration_method]을(를) 따르도록 해주세요.",
            en: "Using the provided image, please [edit_action] [element_to_edit]. Ensure the change [integration_method]."
        },
        edit_inpaint: {
            ko: "제공된 이미지에서, [target_element]만 [new_element](으)로 변경해주세요. 나머지 모든 것은 그대로 유지해주세요.",
            en: "Using the provided image, change only the [target_element] to [new_element]. Keep everything else exactly the same."
        },
        edit_style_transfer: {
            ko: "제공된 [subject] 사진을 [art_style_transfer]으로 변환해주세요. 원본 구성을 보존하되, [style_elements] 특징을 적용해주세요.",
            en: "Transform the provided photograph of [subject] into the artistic style of [art_style_transfer]. Preserve the original composition with [style_elements]."
        },
        edit_composite: {
            ko: "첫 번째 이미지의 [element_from_img1]와(과) 두 번째 이미지의 [element_from_img2]을(를) 결합하여 새로운 이미지를 만들어주세요. 최종 이미지는 [final_scene_desc] 장면이어야 합니다.",
            en: "Create a new image by combining [element_from_img1] from the first image with [element_from_img2] from the second image. The final image should be a scene of [final_scene_desc]."
        }
    },
    semanticNegatives: {
        ko: {
            prefix: " 다음 내용 없이 장면을 긍정적으로 묘사합니다: ",
            template: " 거리는 한적하고 평화로우며, {elements}가 없습니다."
        },
        en: {
            prefix: " Positively describe the scene without the following: ",
            template: " The scene is serene and peaceful, with no {elements} in sight."
        }
    },
    i18n: {
        ko: {
            app_title: "Gemini 프롬프트 생성기",
            app_subtitle: "체계적인 옵션으로 최고의 이미지 생성 프롬프트를 만드세요.",
            category_label: "생성/편집 카테고리",
            purpose_label: "주요 용도",
            generate_btn: "🚀 프롬프트 생성",
            load_example_btn: "✨ 예시 불러오기",
            output_title: "생성된 프롬프트",
            output_meta_category: "카테고리",
            output_meta_purpose: "용도",
            output_meta_images: "참고 이미지",
            copy_success: "복사되었습니다!",
            copy_fail: "복사에 실패했습니다.",
            copy_tooltip: "복사",
            ai_suggest_label: "AI 제안",
            ai_suggest_loading: "AI가 생각 중...",
            image_upload_notice: "참고: 다중 이미지 업로드 시 마지막 이미지의 종횡비를 따릅니다. 드래그하여 순서를 조절할 수 있습니다.",
            usage_title: "사용법 및 주의사항",
            usage_list: [
                "모든 필드를 채울 필요는 없습니다. 원하는 옵션만 선택하여 프롬프트를 생성하세요.",
                "'AI 제안' 버튼으로 창의적인 아이디어를 얻어보세요.",
                "생성된 프롬프트는 시작점입니다. 더 나은 결과를 위해 직접 수정하고 실험해보세요.",
                "이미지 내 텍스트 렌더링은 어려울 수 있으니 여러 번 시도해 보세요."
            ],
            source_text: "이 도구는 다음 가이드를 기반으로 제작되었습니다: ",
        },
        en: {
            app_title: "Gemini Prompt Generator",
            app_subtitle: "Craft the perfect image generation prompt with structured options.",
            category_label: "Creation/Editing Category",
            purpose_label: "Primary Purpose",
            generate_btn: "🚀 Generate Prompt",
            load_example_btn: "✨ Load Example",
            output_title: "Generated Prompt",
            output_meta_category: "Category",
            output_meta_purpose: "Purpose",
            output_meta_images: "Reference Images",
            copy_success: "Copied!",
            copy_fail: "Failed to copy.",
            copy_tooltip: "Copy",
            ai_suggest_label: "AI Suggest",
            ai_suggest_loading: "AI is thinking...",
            image_upload_notice: "Note: When uploading multiple images, the aspect ratio of the last image will be used. You can drag to reorder.",
            usage_title: "Usage & Tips",
            usage_list: [
                "You don't need to fill all fields. Select only the options you want.",
                "Use the 'AI Suggest' button to get creative ideas.",
                "The generated prompt is a starting point. Feel free to modify and experiment for better results.",
                "Text rendering within images can be challenging; multiple attempts may be needed."
            ],
            source_text: "This tool is based on the guide from the ",
        }
    }
};
