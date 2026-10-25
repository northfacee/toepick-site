import type { SiteLocale } from "./site-config";

export interface SiteCopy {
  meta: {
    homeTitle: string;
    homeDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    ogLocale: string;
  };
  header: {
    skipToMain: string;
    brandAria: string;
    navAria: string;
    about: string;
    preview: string;
    download: string;
    langSwitchAria: string;
  };
  store: {
    groupAria: string;
    appleAria: string;
    googleAria: string;
  };
  hero: {
    badge: string;
    kicker: string;
    titleLine1: string;
    titleLine2Prefix: string;
    titleHighlight: string;
    descriptionLine1: string;
    descriptionLine2: string;
    metaNoSignup: string;
    metaFree: string;
    previewCta: string;
  };
  showcase: {
    stickerTitle: string;
    stickerSub: string;
    dragHintReady: string;
    dragHintStatic: string;
    controlsAria: string;
    modes: readonly [
      { label: string; caption: string; tag: string },
      { label: string; caption: string; tag: string },
      { label: string; caption: string; tag: string },
    ];
    disclaimer: string;
  };
  routineStrip: {
    listening: string;
    reading: string;
    vocab: string;
    history: string;
  };
  practice: {
    headingLine1: string;
    headingLine2: string;
    subLine1: string;
    subLine2: string;
    listeningSub: string;
    listeningDescLine1: string;
    listeningDescLine2: string;
    part2Name: string;
    part2Count: string;
    part3Name: string;
    part3Count: string;
    part4Name: string;
    part4Count: string;
    listeningFooter: string;
    listeningTag: string;
    readingSub: string;
    readingDescLine1: string;
    readingDescLine2: string;
    readingPaperCheck: string;
    readingFooter: string;
    readingTag: string;
  };
  review: {
    heading: string;
    sub: string;
    card1Title: string;
    card1DescLine1: string;
    card1DescLine2: string;
    card1StickerMeaning: string;
    card2Title: string;
    card2DescLine1: string;
    card2DescLine2: string;
    card2Pause: string;
    card2Resume: string;
    card3Title: string;
    card3DescLine1: string;
    card3DescLine2: string;
    weekdays: readonly [string, string, string, string, string];
  };
  preview: {
    headingLine1: string;
    headingLine2: string;
    descLine1: string;
    descLine2: string;
    tablistAria: string;
    tabs: readonly [string, string, string, string];
    steps: readonly [
      readonly [string, string],
      readonly [string, string],
      readonly [string, string],
      readonly [string, string],
    ];
    caption: string;
  };
  phone: {
    nav: readonly [string, string, string, string];
    home: {
      subtitle: string;
      dateLine1: string;
      dateLine2: string;
      listeningDesc: string;
      listeningAction: string;
      readingDesc: string;
      readingAction: string;
      streak: string;
    };
    question: {
      subtitle: string;
      prompt: string;
      explanationTitle: string;
      explanationBody: string;
    };
    words: {
      subtitle: string;
      items: readonly [
        readonly [string, string, string],
        readonly [string, string, string],
        readonly [string, string, string],
      ];
    };
    history: {
      subtitle: string;
      calendarTitle: string;
      days: readonly [string, string, string, string, string, string, string];
      calendarNote: string;
      scoreNote: string;
      part2Done: string;
      part5Done: string;
    };
    listening: {
      subtitle: string;
      headline: string;
      pickOption: string;
      audioNote: string;
    };
  };
  closing: {
    iconAlt: string;
    headingLine1: string;
    headingLine2: string;
    descLine1: string;
    descLine2: string;
    downloadNote: string;
  };
  footer: {
    privacyLink: string;
    contactAria: string;
    contactLabel: string;
    copyAria: string;
    copyButton: string;
    copyingButton: string;
    copySuccess: string;
    copyError: string;
    disclaimerLine1: string;
    disclaimerLine2: string;
    backToHome: string;
  };
}

export const SITE_COPY: Record<SiteLocale, SiteCopy> = {
  ko: {
    meta: {
      homeTitle: "TOE-PICK — 매일 듣고, 풀고, 내 것으로.",
      homeDescription:
        "iOS·Android 정식 출시. 회원가입 없이 시작하는 토익 루틴. Part 2·3·4 듣기, Part 5 독해, 한국어 해설과 나만의 단어장, 학습 기록.",
      privacyTitle: "개인정보처리방침 | TOE-PICK",
      privacyDescription:
        "TOE-PICK의 정보 처리, 외부 서비스, 보관 및 삭제 안내.",
      ogLocale: "ko_KR",
    },
    header: {
      skipToMain: "본문으로 이동",
      brandAria: "TOE-PICK 홈",
      navAria: "주 메뉴",
      about: "앱 소개",
      preview: "미리보기",
      download: "앱 다운로드",
      langSwitchAria: "언어 선택",
    },
    store: {
      groupAria: "앱 다운로드",
      appleAria: "App Store에서 다운로드 (새 창)",
      googleAria: "Google Play에서 다운로드 (새 창)",
    },
    hero: {
      badge: "NOW AVAILABLE · 정식 출시",
      kicker: "토익 공부에도, 내 취향과 내 페이스.",
      titleLine1: "매일 듣고,",
      titleLine2Prefix: "풀고, ",
      titleHighlight: "내 것으로",
      descriptionLine1: "오늘의 LC부터 RC, 해설과 단어 복습까지.",
      descriptionLine2: "작은 성취가 쌓이는 나만의 토익 루틴을 시작해요.",
      metaNoSignup: "회원가입 없이 바로 시작",
      metaFree: "무료 다운로드",
      previewCta: "앱 미리보기",
    },
    showcase: {
      stickerTitle: "오늘도, 한 문제씩.",
      stickerSub: "MAKE IT A DAILY THING.",
      dragHintReady: "가볍게 드래그해 보세요",
      dragHintStatic: "아래에서 화면을 골라보세요",
      controlsAria: "3D 앱 미리보기 모드",
      modes: [
        {
          label: "듣기",
          caption: "듣고, 고르고. 귀가 열리는 작은 루틴.",
          tag: "LISTENING",
        },
        {
          label: "독해",
          caption: "한 문장씩 이해하고, 내 실력으로.",
          tag: "READING",
        },
        {
          label: "단어",
          caption: "오늘 만난 표현, 내일의 자신감.",
          tag: "MY WORDS",
        },
      ],
      disclaimer: "소개용 예시 화면 · 음성은 재생되지 않아요",
    },
    routineStrip: {
      listening: "듣기",
      reading: "독해",
      vocab: "나만의 단어장",
      history: "매일의 학습 기록",
    },
    practice: {
      headingLine1: "오늘의 토익,",
      headingLine2: "이 두 장이면 준비 끝.",
      subLine1: "듣고, 읽고, 이해하는 시간.",
      subLine2: "매일 새로운 문제로 공부의 리듬을 만들어요.",
      listeningSub: "귀가 트이는 오늘의 한 세트.",
      listeningDescLine1: "질문·응답부터 대화와 담화까지.",
      listeningDescLine2:
        "듣고 고른 뒤, 대본과 한국어 해설로 다시 이해해요.",
      part2Name: "질문·응답",
      part2Count: "10문제",
      part3Name: "대화",
      part3Count: "3문제",
      part4Name: "담화",
      part4Count: "3문제",
      listeningFooter: "30초 미리보기로 Part 3·4도 차근차근.",
      listeningTag: "16문제 / DAY",
      readingSub: "빈칸 하나, 확실한 이해 하나.",
      readingDescLine1: "문법·어휘·비즈니스 표현을 한 문장씩.",
      readingDescLine2: "정답의 근거와 헷갈린 보기까지 해설로 짚어봐요.",
      readingPaperCheck: "정답의 이유까지 내 것으로",
      readingFooter: "풀고, 이해하고, 기억하고.",
      readingTag: "20문제 / DAY",
    },
    review: {
      heading: "풀고 나서가 진짜 공부니까.",
      sub: "문제 한 세트에서 끝나지 않는 루틴.",
      card1Title: "기억하고 싶은 단어는 쏙.",
      card1DescLine1: "해설에서 만난 표현을 즐겨찾기에.",
      card1DescLine2: "예문과 함께 내 단어장에 모아요.",
      card1StickerMeaning: "미리, 사전에",
      card2Title: "내 속도로, 이어서.",
      card2DescLine1: "풀던 문제는 이어풀고, 오답은 다시.",
      card2DescLine2: "잠깐 쉬어가도 루틴은 이어져요.",
      card2Pause: "잠깐의 쉼표",
      card2Resume: "다시 시작",
      card3Title: "꾸준함이 눈에 보이게.",
      card3DescLine1: "학습 달력과 파트별 정답·오답 기록.",
      card3DescLine2: "쌓인 공부를 돌아보고 다시 도전해요.",
      weekdays: ["월", "화", "수", "목", "금"],
    },
    preview: {
      headingLine1: "내 손안의",
      headingLine2: "작은 공부방.",
      descLine1: "복잡한 준비 없이, 나에게 필요한 공부만.",
      descLine2: "앱 안에서 이어지는 나의 공부 루틴.",
      tablistAria: "앱 화면 미리보기",
      tabs: ["홈", "문제", "단어", "기록"],
      steps: [
        [
          "오늘의 공부가 한눈에.",
          "듣기와 독해, 지금 시작할 문제를 가볍게 골라요. 내 페이스대로 하나씩 채우면 충분해요.",
        ],
        [
          "정답 다음에는, 이해.",
          "문제를 풀고 제출하면 한국어 해설을 확인해요. 헷갈린 보기의 이유도 함께 짚어봐요.",
        ],
        [
          "눈에 익은 단어를, 내 단어로.",
          "해설에서 만난 표현을 즐겨찾기에 모아두세요. 원문과 함께 다시 보면 더 오래 남아요.",
        ],
        [
          "조금씩 쌓이는 나의 꾸준함.",
          "학습 달력과 Part 2·3·4·5별 정답·오답으로 공부한 날을 돌아봐요. 완료한 문제는 다시 복습할 수 있어요.",
        ],
      ],
      caption: "* 소개용 예시 화면이며 실제 학습 기록이 아닙니다.",
    },
    phone: {
      nav: ["홈", "단어", "기록", "마이페이지"],
      home: {
        subtitle: "오늘의 작은 도전",
        dateLine1: "시험일",
        dateLine2: "설정",
        listeningDesc: "질문·응답, 대화, 담화를 듣고 풀어요.",
        listeningAction: "Listening 열기",
        readingDesc: "문법과 어휘를 채우는 20문제",
        readingAction: "Part 5 시작하기",
        streak: "오늘의 나에게, 작은 체크 하나.",
      },
      question: {
        subtitle: "PART 5 · 문항 예시",
        prompt: "빈칸에 알맞은 표현을 골라보세요.",
        explanationTitle: "제출 후 해설 예시",
        explanationBody:
          "동사 completed를 꾸미는 자리에는 부사 successfully가 필요해요.",
      },
      words: {
        subtitle: "다시 만나는 나의 단어",
        items: [
          [
            "successfully",
            "성공적으로",
            "The team completed the project successfully.",
          ],
          ["in advance", "미리, 사전에", "Please book your tickets in advance."],
          ["colleague", "동료", "I had lunch with a colleague."],
        ],
      },
      history: {
        subtitle: "한눈에 보는 공부 습관",
        calendarTitle: "나의 학습 달력",
        days: ["월", "화", "수", "목", "금", "토", "일"],
        calendarNote: "✓ 학습한 날을 차곡차곡",
        scoreNote: "정답 · 오답 기록",
        part2Done: "PART 2 · 완료",
        part5Done: "PART 5 · 완료",
      },
      listening: {
        subtitle: "PART 2 · 듣기 예시",
        headline: "듣고, 고르고, 다시 듣고.",
        pickOption: "응답 선택",
        audioNote: "소개용 예시 · 음성은 재생되지 않아요",
      },
    },
    closing: {
      iconAlt: "민트 헤드폰을 쓴 TOE-PICK 토끼",
      headingLine1: "오늘의 작은 시작,",
      headingLine2: "TOE-PICK과 함께.",
      descLine1: "첫 문제를 고르는 순간부터, 나만의 루틴이 시작돼요.",
      descLine2: "지금 앱에서 만나요.",
      downloadNote: "iOS · Android에서 무료 다운로드 · 앱 내 광고 포함",
    },
    footer: {
      privacyLink: "개인정보처리방침",
      contactAria: "이메일 문의",
      contactLabel: "문의",
      copyAria: "이메일 주소 복사",
      copyButton: "주소 복사",
      copyingButton: "복사 중…",
      copySuccess: "이메일 주소를 복사했어요.",
      copyError: "복사하지 못했어요. 주소를 선택해 직접 복사해 주세요.",
      disclaimerLine1:
        "TOE-PICK은 ETS의 공식 앱이 아닌 독립적인 학습 앱입니다.",
      disclaimerLine2:
        "AI가 생성한 문항과 해설에는 오류가 있을 수 있습니다.",
      backToHome: "← ToePick 소개로 돌아가기",
    },
  },
  en: {
    meta: {
      homeTitle: "TOE-PICK — Listen, Solve, and Make It Yours Every Day.",
      homeDescription:
        "Available on iOS & Android. Start your daily TOEIC routine with no sign-up required. Part 2·3·4 Listening, Part 5 Reading, clear explanations, vocabulary book, and study records.",
      privacyTitle: "Privacy Policy | TOE-PICK",
      privacyDescription:
        "How TOE-PICK processes information, uses third-party services, and handles retention and deletion.",
      ogLocale: "en_US",
    },
    header: {
      skipToMain: "Skip to main content",
      brandAria: "TOE-PICK Home",
      navAria: "Main navigation",
      about: "Features",
      preview: "App Preview",
      download: "Get the App",
      langSwitchAria: "Select language",
    },
    store: {
      groupAria: "Download the app",
      appleAria: "Download on the App Store (opens in a new tab)",
      googleAria: "Get it on Google Play (opens in a new tab)",
    },
    hero: {
      badge: "NOW AVAILABLE · iOS & ANDROID",
      kicker: "TOEIC prep that fits your style and pace.",
      titleLine1: "Listen daily,",
      titleLine2Prefix: "solve, & ",
      titleHighlight: "make it yours",
      descriptionLine1:
        "From daily Listening and Reading to clear explanations and word review.",
      descriptionLine2:
        "Build a steady TOEIC habit where small wins add up every day.",
      metaNoSignup: "Start instantly without sign-up",
      metaFree: "Free download",
      previewCta: "Preview the App",
    },
    showcase: {
      stickerTitle: "One question at a time.",
      stickerSub: "MAKE IT A DAILY THING.",
      dragHintReady: "Drag gently to rotate",
      dragHintStatic: "Pick a screen below",
      controlsAria: "3D app preview mode",
      modes: [
        {
          label: "Listening",
          caption: "Listen and choose. A compact routine to sharpen your ear.",
          tag: "LISTENING",
        },
        {
          label: "Reading",
          caption: "Master grammar and business expressions one sentence at a time.",
          tag: "READING",
        },
        {
          label: "Words",
          caption: "Save today's expressions for tomorrow's confidence.",
          tag: "MY WORDS",
        },
      ],
      disclaimer: "Sample preview screen · Audio does not play here",
    },
    routineStrip: {
      listening: "Listening",
      reading: "Reading",
      vocab: "My Vocabulary",
      history: "Daily Study Log",
    },
    practice: {
      headingLine1: "Today's TOEIC,",
      headingLine2: "ready in two daily sets.",
      subLine1: "Time to listen, read, and truly understand.",
      subLine2: "Build your study rhythm with fresh questions every day.",
      listeningSub: "Open up your ears with today's set.",
      listeningDescLine1:
        "From Question-Response to Short Conversations and Talks.",
      listeningDescLine2:
        "Listen, pick your answer, and review with full transcripts and explanations.",
      part2Name: "Q & Response",
      part2Count: "10 Qs",
      part3Name: "Conversations",
      part3Count: "3 Qs",
      part4Name: "Short Talks",
      part4Count: "3 Qs",
      listeningFooter: "Tackle Part 3·4 step by step with a 30s preview.",
      listeningTag: "16 QS / DAY",
      readingSub: "One blank, one clear takeaway.",
      readingDescLine1:
        "Grammar, vocabulary, and business expressions sentence by sentence.",
      readingDescLine2:
        "See why the right answer works and why each distractor falls short.",
      readingPaperCheck: "Understand the exact reason behind every answer",
      readingFooter: "Solve, understand, and remember.",
      readingTag: "20 QS / DAY",
    },
    review: {
      heading: "Real learning starts after you answer.",
      sub: "A routine that goes beyond just finishing a set.",
      card1Title: "Keep the words that matter.",
      card1DescLine1: "Bookmark useful expressions straight from explanations.",
      card1DescLine2: "Collect them with example sentences in your wordbook.",
      card1StickerMeaning: "beforehand, ahead of time",
      card2Title: "Pick up right where you left off.",
      card2DescLine1: "Resume unfinished sets anytime and revisit mistakes.",
      card2DescLine2: "Even with a quick break, your streak stays on track.",
      card2Pause: "Quick pause",
      card2Resume: "Resume",
      card3Title: "See your consistency grow.",
      card3DescLine1: "Study calendar and accuracy breakdown for every part.",
      card3DescLine2: "Look back on your progress and challenge yourself again.",
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    preview: {
      headingLine1: "A cozy study room",
      headingLine2: "right in your hand.",
      descLine1: "No clutter—just the focused practice you need.",
      descLine2: "Explore how your daily TOEIC routine flows inside the app.",
      tablistAria: "App screen preview",
      tabs: ["Home", "Question", "Words", "History"],
      steps: [
        [
          "Today's quests at a glance.",
          "Pick Listening or Reading and start right away. Going one question at a time at your own pace is all it takes.",
        ],
        [
          "Clear explanations after every answer.",
          "Submit your choice to unlock the full explanation and option breakdown so no grammar point stays fuzzy.",
        ],
        [
          "Turn new words into your own.",
          "Star key vocabulary from explanations and review them with context sentences—even when you're offline.",
        ],
        [
          "Consistency you can see.",
          "Track your studied days on the calendar and check accuracy across Parts 2·3·4·5 anytime.",
        ],
      ],
      caption: "* Sample preview screens for illustration only.",
    },
    phone: {
      nav: ["Home", "Words", "History", "My Page"],
      home: {
        subtitle: "Today's Daily Challenge",
        dateLine1: "Exam",
        dateLine2: "D-Day",
        listeningDesc: "Listen and solve Q&A, conversations, and talks.",
        listeningAction: "Open Listening",
        readingDesc: "20 grammar & vocabulary questions",
        readingAction: "Start Part 5",
        streak: "One small check for today's routine.",
      },
      question: {
        subtitle: "PART 5 · Sample Question",
        prompt: "Choose the word that best completes the sentence.",
        explanationTitle: "Explanation after submission",
        explanationBody:
          "The adverb 'successfully' is needed here to modify the verb 'completed'.",
      },
      words: {
        subtitle: "Saved expressions to revisit",
        items: [
          [
            "successfully",
            "in a successful way",
            "The team completed the project successfully.",
          ],
          [
            "in advance",
            "beforehand, ahead of time",
            "Please book your tickets in advance.",
          ],
          [
            "colleague",
            "co-worker, teammate",
            "I had lunch with a colleague.",
          ],
        ],
      },
      history: {
        subtitle: "Your study habit at a glance",
        calendarTitle: "My Study Calendar",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        calendarNote: "✓ Day by day, building your streak",
        scoreNote: "Correct · Wrong Log",
        part2Done: "PART 2 · Done",
        part5Done: "PART 5 · Done",
      },
      listening: {
        subtitle: "PART 2 · Listening Sample",
        headline: "Listen, choose, and replay.",
        pickOption: "Select response",
        audioNote: "Sample preview · Audio is not played here",
      },
    },
    closing: {
      iconAlt: "TOE-PICK rabbit wearing mint headphones",
      headingLine1: "Start small today,",
      headingLine2: "with TOE-PICK.",
      descLine1: "Your personal TOEIC routine begins with the very first question.",
      descLine2: "Meet your daily set in the app now.",
      downloadNote: "Free download on iOS & Android · Contains in-app ads",
    },
    footer: {
      privacyLink: "Privacy Policy",
      contactAria: "Email support",
      contactLabel: "Contact",
      copyAria: "Copy support email address",
      copyButton: "Copy email",
      copyingButton: "Copying…",
      copySuccess: "Copied email address to clipboard.",
      copyError: "Could not copy automatically. Please select and copy the address.",
      disclaimerLine1:
        "TOE-PICK is an independent study app and is not affiliated with ETS.",
      disclaimerLine2:
        "AI-generated questions and explanations may occasionally contain errors.",
      backToHome: "← Back to ToePick",
    },
  },
  ja: {
    meta: {
      homeTitle: "TOE-PICK — 毎日聴いて、解いて、自分のものに。",
      homeDescription:
        "iOS・Android正式リリース。会員登録なしで始めるTOEIC学習ルーティン。Part 2・3・4リスニング、Part 5リーディング、丁寧な解説と単語帳、学習記録。",
      privacyTitle: "プライバシーポリシー | TOE-PICK",
      privacyDescription:
        "TOE-PICKにおける情報処理、外部サービス利用、保管および削除に関するご案内。",
      ogLocale: "ja_JP",
    },
    header: {
      skipToMain: "本文へ移動",
      brandAria: "TOE-PICK ホーム",
      navAria: "メインメニュー",
      about: "機能紹介",
      preview: "プレビュー",
      download: "アプリを入手",
      langSwitchAria: "言語選択",
    },
    store: {
      groupAria: "アプリをダウンロード",
      appleAria: "App Storeからダウンロード（新しいタブ）",
      googleAria: "Google Playで手に入れよう（新しいタブ）",
    },
    hero: {
      badge: "NOW AVAILABLE · 正式リリース",
      kicker: "TOEIC対策も、自分の好みと自分のペースで。",
      titleLine1: "毎日聴いて、",
      titleLine2Prefix: "解いて、",
      titleHighlight: "自分のものに",
      descriptionLine1:
        "今日のリスニングからリーディング、解説と単語の復習まで。",
      descriptionLine2:
        "小さな達成感が積み重なる、自分だけのTOEICルーティンを始めましょう。",
      metaNoSignup: "登録なしですぐスタート",
      metaFree: "無料ダウンロード",
      previewCta: "アプリを見る",
    },
    showcase: {
      stickerTitle: "今日も、1問ずつ。",
      stickerSub: "MAKE IT A DAILY THING.",
      dragHintReady: "左右にドラッグして回転",
      dragHintStatic: "下のボタンで画面を切り替え",
      controlsAria: "3Dアプリプレビューモード",
      modes: [
        {
          label: "リスニング",
          caption: "聴いて、選ぶ。耳が慣れる毎日の小さな習慣。",
          tag: "LISTENING",
        },
        {
          label: "リーディング",
          caption: "1文ずつ理解して、確かな実力に。",
          tag: "READING",
        },
        {
          label: "単語",
          caption: "今日出会った表現が、明日の自信になる。",
          tag: "MY WORDS",
        },
      ],
      disclaimer: "紹介用サンプル画面 · 音声は再生されません",
    },
    routineStrip: {
      listening: "リスニング",
      reading: "リーディング",
      vocab: "マイ単語帳",
      history: "毎日の学習記録",
    },
    practice: {
      headingLine1: "今日のTOEIC、",
      headingLine2: "この2セットで準備完了。",
      subLine1: "聴いて、読んで、納得する時間。",
      subLine2: "毎日新しい問題で学習のリズムを作りましょう。",
      listeningSub: "耳が慣れる今日の1セット。",
      listeningDescLine1: "応答問題から会話・説明文まで。",
      listeningDescLine2:
        "聴いて選んだ後は、スクリプトと丁寧な解説でしっかり復習できます。",
      part2Name: "応答問題",
      part2Count: "10問",
      part3Name: "会話問題",
      part3Count: "3問",
      part4Name: "説明文問題",
      part4Count: "3問",
      listeningFooter: "30秒の先読みでPart 3·4も落ち着いて挑戦。",
      listeningTag: "16問 / DAY",
      readingSub: "空欄ひとつに、確かな理解を。",
      readingDescLine1: "文法・語彙・ビジネス表現を1文ずつ。",
      readingDescLine2:
        "正解の根拠から紛らわしい選択肢の理由まで解説でチェック。",
      readingPaperCheck: "正解の理由までしっかり自分のものに",
      readingFooter: "解いて、理解して、記憶する。",
      readingTag: "20問 / DAY",
    },
    review: {
      heading: "解いた後こそ、本当の勉強だから。",
      sub: "1セット解いて終わりにしない学習ルーティン。",
      card1Title: "覚えたい単語をサッと保存。",
      card1DescLine1: "解説で出会った重要表現をお気に入りに。",
      card1DescLine2: "例文と一緒にマイ単語帳へ集めましょう。",
      card1StickerMeaning: "事前に、あらかじめ",
      card2Title: "自分のペースで、続きから。",
      card2DescLine1: "途中の問題は続きから、間違えた問題はもう一度。",
      card2DescLine2: "少し休んでもルーティンは途切れません。",
      card2Pause: "ひと休み",
      card2Resume: "再開する",
      card3Title: "毎日の積み重ねが見える。",
      card3DescLine1: "学習カレンダーとパート別の正答・誤答記録。",
      card3DescLine2: "積み上げた記録を振り返り、次の挑戦へ。",
      weekdays: ["月", "火", "水", "木", "金"],
    },
    preview: {
      headingLine1: "手のひらの中の",
      headingLine2: "小さな自習室。",
      descLine1: "面倒な準備は不要。今必要な学習だけをシンプルに。",
      descLine2: "アプリの中でつながる毎日のTOEICルーティン。",
      tablistAria: "アプリ画面プレビュー",
      tabs: ["ホーム", "問題", "単語", "記録"],
      steps: [
        [
          "今日の学習がひと目でわかる。",
          "リスニングとリーディングから今始める問題を気軽に選択。自分のペースで1問ずつ進められます。",
        ],
        [
          "解答のあとは、しっかり理解。",
          "問題を解いて提出すると日本語の解説を確認できます。迷った選択肢の理由も一緒に整理しましょう。",
        ],
        [
          "出会った表現を、自分の単語に。",
          "解説の中の重要表現をお気に入りに保存。例文と一緒に見返すことで記憶に定着します。",
        ],
        [
          "少しずつ積み重なる継続の記録。",
          "学習カレンダーとPart 2·3·4·5別の正答率で頑張った日を振り返り。完了したセットはいつでも復習できます。",
        ],
      ],
      caption: "* 紹介用のサンプル画面であり、実際の学習記録ではありません。",
    },
    phone: {
      nav: ["ホーム", "単語", "記録", "マイページ"],
      home: {
        subtitle: "今日の小さな挑戦",
        dateLine1: "試験日",
        dateLine2: "設定",
        listeningDesc: "応答・会話・説明文を聴いて解きましょう。",
        listeningAction: "Listening を開く",
        readingDesc: "文法と語彙を鍛える20問",
        readingAction: "Part 5 を始める",
        streak: "今日の自分に、小さなチェックをひとつ。",
      },
      question: {
        subtitle: "PART 5 · 問題サンプル",
        prompt: "空欄に入る最も適切な表現を選んでください。",
        explanationTitle: "提出後の解説サンプル",
        explanationBody:
          "動詞 completed を修飾する位置には副詞 successfully が必要です。",
      },
      words: {
        subtitle: "繰り返し見返すマイ単語帳",
        items: [
          [
            "successfully",
            "首尾よく、成功裏に",
            "The team completed the project successfully.",
          ],
          ["in advance", "事前に、あらかじめ", "Please book your tickets in advance."],
          ["colleague", "同僚", "I had lunch with a colleague."],
        ],
      },
      history: {
        subtitle: "ひと目でわかる学習習慣",
        calendarTitle: "マイ学習カレンダー",
        days: ["月", "火", "水", "木", "金", "土", "日"],
        calendarNote: "✓ 学習した日をコツコツ記録",
        scoreNote: "正解 · 不正解の記録",
        part2Done: "PART 2 · 完了",
        part5Done: "PART 5 · 完了",
      },
      listening: {
        subtitle: "PART 2 · リスニング例",
        headline: "聴いて、選んで、もう一度聴く。",
        pickOption: "応答を選択",
        audioNote: "紹介用サンプル · 音声は再生されません",
      },
    },
    closing: {
      iconAlt: "ミント色のヘッドホンをつけたTOE-PICKのうさぎ",
      headingLine1: "今日の小さな一歩を、",
      headingLine2: "TOE-PICKと一緒に。",
      descLine1: "最初の1問を選んだ瞬間から、あなただけのルーティンが始まります。",
      descLine2: "今すぐアプリで始めましょう。",
      downloadNote: "iOS · Androidで無料ダウンロード · アプリ内広告あり",
    },
    footer: {
      privacyLink: "プライバシーポリシー",
      contactAria: "メールでのお問い合わせ",
      contactLabel: "お問い合わせ",
      copyAria: "メールアドレスをコピー",
      copyButton: "アドレスをコピー",
      copyingButton: "コピー中…",
      copySuccess: "メールアドレスをコピーしました。",
      copyError:
        "コピーできませんでした。アドレスを選択して直接コピーしてください。",
      disclaimerLine1:
        "TOE-PICKはETSの公式アプリではなく、独立した学習アプリです。",
      disclaimerLine2:
        "AIが生成した問題や解説には誤りが含まれる場合があります。",
      backToHome: "← ToePick 紹介ページへ戻る",
    },
  },
};
