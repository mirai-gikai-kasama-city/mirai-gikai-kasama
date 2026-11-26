/**
 * 【書き出したもの】平成18〜22年（議会だより第2〜20号）の一般質問。手で直すときは元の JSON も直す。
 * 生成: kasama-work\ippan-h18\build-ts.mjs（元: kasama-work\ippan-h18\records\<会期キー>.json）
 *
 * - 質問した日と順番は会議録（議長が質問者を呼んだ順）。会議録と議会だよりの質問者は全会期で一致した
 * - 題（items）は議会だよりの見出し。議会だよりの紙面を ChatGPT に書き起こしてもらい、PDF から取り出した文字と
 *   機械で照らし合わせ、合わないところは運営者が紙面で確かめた（2026-11-27）
 * - 222件（19会期）
 */
import type { GeneralQuestionRecord } from "@mirai-gikai/shared/council/types";

function fromMinutesH18(
  sessionKey: string,
  sessionName: string,
  questionDate: string,
  dayIndex: number,
  order: number,
  memberName: string,
  minutesPdfUrl: string,
  items: string[]
): GeneralQuestionRecord {
  return {
    id: `kasama-${sessionKey}-${order}`,
    sessionKey: `kasama-${sessionKey}`,
    sessionName,
    questionDate,
    dayIndex,
    order,
    memberName,
    familyName: memberName.split(" ")[0],
    faction: null,
    isRepresentative: false,
    format: null,
    items,
    itemsSource: "dayori",
    outline: null,
    videoUrl: null,
    minutesUrl: minutesPdfUrl,
    sourceUrl: minutesPdfUrl,
    pdfUrl: null,
  };
}

export const H18_H22_GENERAL_QUESTIONS: readonly GeneralQuestionRecord[] = [
  // 平成18年第1回定例会（かさま市議会だより第2号）
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-20",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_2.pdf",
    ["合併後の一体感を醸し出すために"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-20",
    1,
    2,
    "鈴木 努",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_2.pdf",
    ["市長のマニフェストと人口減少対策について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-20",
    1,
    3,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_2.pdf",
    ["職員の適正配置と県立中央病院へ産科・小児科の設置を"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-20",
    1,
    4,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_2.pdf",
    ["行財政改革と合併特例債について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-20",
    1,
    5,
    "成田 正",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_2.pdf",
    ["友部駅周辺整備のスケジュールと登下校時の安全確保を"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-20",
    1,
    6,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_2.pdf",
    ["国保税の引き下げと「内心の自由」の保障について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-20",
    1,
    7,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_2.pdf",
    ["交通渋滞の緩和と健康文化ロードの設定について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-21",
    2,
    8,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_3.pdf",
    ["市民に見える政治と今後の用地利用構想について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-21",
    2,
    9,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_3.pdf",
    ["道路運送法第80条と火災報知器の設置について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-21",
    2,
    10,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_3.pdf",
    ["危険な生活道路と少子化対策について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-21",
    2,
    11,
    "菅原 毅",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_3.pdf",
    ["スポーツの振興と祝日のごみ収集の実施を"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-21",
    2,
    12,
    "川澄 清子",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_3.pdf",
    ["市政懇談会の実施とＡＥＤの設置を"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-21",
    2,
    13,
    "佐宗 裕子",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_3.pdf",
    ["よりよい行政と市民とのかかわり18年度予算編成について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-21",
    2,
    14,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_3.pdf",
    ["市立病院の経営について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-22",
    3,
    15,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_4.pdf",
    ["入札制度と開かれた市政について"]
  ),
  fromMinutesH18(
    "h18-1-teirei",
    "平成18年第1回定例会",
    "2006-06-22",
    3,
    16,
    "鹿志村 清一",
    "https://www.city.kasama.lg.jp/data/doc/1314793871_doc_56_4.pdf",
    ["通学路の防犯情報サービスと児童生徒の健全育成について"]
  ),

  // 平成18年第2回定例会（かさま市議会だより第3号）
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-19",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_2.pdf",
    ["企業広告の掲載と市政懇談会の成果について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-19",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_2.pdf",
    ["行財政改革の推進とエコフロンティアかさまの安全対策について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-19",
    1,
    3,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_2.pdf",
    ["中心市街地活性化公共交通網の整備について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-19",
    1,
    4,
    "菅原 毅",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_2.pdf",
    ["健康野菜づくりと笠間米の銘柄確立について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-20",
    2,
    5,
    "成田 正",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_3.pdf",
    ["遊具施設の設置と生活保護の現況、福祉バスの運行について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-20",
    2,
    6,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_3.pdf",
    ["職員の仕事の互換性と基礎的な教育、不祥事防止について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-20",
    2,
    7,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_3.pdf",
    ["学校の耐震診断と建設計画国保と介護について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-20",
    2,
    8,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_3.pdf",
    ["戦没者追悼式の今後と下水道接続に伴う油脂遮断装置の設置について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-20",
    2,
    9,
    "佐宗 裕子",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_3.pdf",
    ["環境基本計画における市民との協働と外国人研修生の現況について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-20",
    2,
    10,
    "藤枝 浩",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_3.pdf",
    ["通学路の危険箇所の見直しについて"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-20",
    2,
    11,
    "川﨑 幸助",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_3.pdf",
    ["飲酒運転における職員の処分と岩間中学校の改修新築の計画について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-21",
    3,
    12,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_4.pdf",
    ["幹線道路整備の進捗状況と減反政策について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-21",
    3,
    13,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_4.pdf",
    ["公共事業の発注と新市づくりについて"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-21",
    3,
    14,
    "鹿志村 清一",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_4.pdf",
    ["芸術の森公園野外ステージの活用と駅における市民意識の共有化について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-21",
    3,
    15,
    "金澤 克彦",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_4.pdf",
    ["市政懇談会の内容と高齢者の交通安全対策について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-21",
    3,
    16,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_4.pdf",
    ["住民負担の軽減と各種公共料金の統一時期について"]
  ),
  fromMinutesH18(
    "h18-2-teirei",
    "平成18年第2回定例会",
    "2006-09-21",
    3,
    17,
    "宮本 曻",
    "https://www.city.kasama.lg.jp/data/doc/1314793477_doc_56_4.pdf",
    ["火災時の指令伝達の短縮について"]
  ),

  // 平成18年第3回定例会（かさま市議会だより第4号）
  fromMinutesH18(
    "h18-3-teirei",
    "平成18年第3回定例会",
    "2006-11-16",
    1,
    1,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314793272_doc_56_1.pdf",
    ["市民税やイノシシの被害対策"]
  ),
  fromMinutesH18(
    "h18-3-teirei",
    "平成18年第3回定例会",
    "2006-11-16",
    1,
    2,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314793272_doc_56_1.pdf",
    ["来年度の予算編成について"]
  ),

  // 平成19年第1回定例会（かさま市議会だより第5号）
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-19",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_2.pdf",
    ["農業委員選挙制度の課題と道路建設計画の今後について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-19",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_2.pdf",
    ["税負担増の実態と組織見直しに伴う住民サービスの低下への危惧．"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-19",
    1,
    3,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_2.pdf",
    ["厳しい経済環境下での予算編成について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-19",
    1,
    4,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_2.pdf",
    ["信号機の設置とマル福の所得制限の撤廃について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-19",
    1,
    5,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_2.pdf",
    ["市のこれからの治山事業について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-20",
    2,
    6,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_3.pdf",
    ["食育の推進と安全な農産物の供給について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-20",
    2,
    7,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_3.pdf",
    ["指定管理者制度と子供の放課後対策事業について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-20",
    2,
    8,
    "村上 典男",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_3.pdf",
    ["市の入札制度の現状と課題、地場産業の振興策について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-20",
    2,
    9,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_3.pdf",
    ["新たな交通システムの導入とごみ収集問題について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-22",
    3,
    10,
    "須藤 勝雄",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_4.pdf",
    ["友部駅周辺の整備計画と職員の適正管理について"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-22",
    3,
    11,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_4.pdf",
    ["地域間格差の無い新市づくりとエコフロンティアかさまについて"]
  ),
  fromMinutesH18(
    "h19-1-teirei",
    "平成19年第1回定例会",
    "2007-03-22",
    3,
    12,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314791809_doc_56_4.pdf",
    ["通学路の安全性対策と認定農業者の拡大政策について"]
  ),

  // 平成19年第2回定例会（かさま市議会だより第6号）
  fromMinutesH18(
    "h19-2-teirei",
    "平成19年第2回定例会",
    "2007-06-14",
    1,
    1,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314791586_doc_56_2.pdf",
    [
      "08年４月から実施される後期高齢者医療制度について",
      "小額所得者減免制度について",
      "イノシシ、ハクビシン対策と農村地域の活性化、グリーンツーリズムについて",
      "「エコフロンティアかさま」の情報開示と安全性について",
    ]
  ),
  fromMinutesH18(
    "h19-2-teirei",
    "平成19年第2回定例会",
    "2007-06-14",
    1,
    2,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314791586_doc_56_2.pdf",
    [
      "朝房山の底地買い上げについて",
      "周遊バスの運行について",
      "国民生活習慣病について",
    ]
  ),
  fromMinutesH18(
    "h19-2-teirei",
    "平成19年第2回定例会",
    "2007-06-14",
    1,
    3,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314791586_doc_56_2.pdf",
    [
      "市バスの利用状況は",
      "県道石岡城里線バイパス計画について",
      "人事異動について",
    ]
  ),
  fromMinutesH18(
    "h19-2-teirei",
    "平成19年第2回定例会",
    "2007-06-14",
    1,
    4,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314791586_doc_56_2.pdf",
    ["増税問題について", "消防防災について"]
  ),
  fromMinutesH18(
    "h19-2-teirei",
    "平成19年第2回定例会",
    "2007-06-15",
    2,
    5,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314791586_doc_56_3.pdf",
    ["もっと医療改革に対する危機意識を", "行政経費削減分を保育料無料化へ"]
  ),
  fromMinutesH18(
    "h19-2-teirei",
    "平成19年第2回定例会",
    "2007-06-15",
    2,
    6,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314791586_doc_56_3.pdf",
    ["環境保全と地域づくりについて", "岩間駅周辺整備計画について"]
  ),
  fromMinutesH18(
    "h19-2-teirei",
    "平成19年第2回定例会",
    "2007-06-15",
    2,
    7,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314791586_doc_56_3.pdf",
    [
      "ごみ集積所の安全対策の取り組みは",
      "介護用品事業制度と利用者の不利益について",
    ]
  ),

  // 平成19年第3回定例会（かさま市議会だより第7号）
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-14",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_2.pdf",
    [
      "友部駅北口の改良について",
      "本戸地内の県道稲田友部線道路改良について",
      "県道真端水戸線、大橋〜池野辺間の整備について",
      "茨城県畜産試験場跡地について",
    ]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-14",
    1,
    2,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_2.pdf",
    ["税の収納率対策について"]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-14",
    1,
    3,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_2.pdf",
    [
      "後期高齢者医療制度について",
      "補助金交付基準やその実績報告について",
      "新交通システムについて",
      "エコフロンティアかさまについて",
      "市税のコンビニ収納実施について",
      "農、山間地の活性化とイノシシ、ハクビシン対策について",
    ]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-14",
    1,
    4,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_2.pdf",
    ["介護保険について", "西町跨線人道橋について", "住宅耐震診断について"]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-18",
    2,
    5,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_3.pdf",
    ["現状は良くても問題は10年後", "図書購入費の保護者負担はやめるべき"]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-18",
    2,
    6,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_3.pdf",
    ["戦没者追悼式に子どもたちの参列を", "笠間市の防災対策について"]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-18",
    2,
    7,
    "小薗江 一三",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_3.pdf",
    ["美しい笠間市づくりと教育問題について", "消防、救急体制について"]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-18",
    2,
    8,
    "村上 典男",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_3.pdf",
    [
      "茨城中央工業団地（笠間地区）の現状とは",
      "本市における東大牧場の位置づけとは",
      "笠間東工業団地の現状と今後について",
      "エコフロンティアかさまにかかわる現状について",
    ]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-19",
    3,
    9,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_4.pdf",
    [
      "笠間市の活性化の進め方について",
      "多選問題と高額な退職金について",
      "参院選の結果を踏まえて",
      "母子家庭と生活保護世帯の増加について",
    ]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-19",
    3,
    10,
    "小磯 節子",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_4.pdf",
    ["笠間市立病院について", "子育て支援について"]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-19",
    3,
    11,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_4.pdf",
    ["支所の扱いについて", "教育施設の充実について"]
  ),
  fromMinutesH18(
    "h19-3-teirei",
    "平成19年第3回定例会",
    "2007-09-19",
    3,
    12,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314791311_doc_56_4.pdf",
    ["市長あての私書箱設置を", "小中学校にソーラー発電を"]
  ),

  // 平成19年第4回定例会（かさま市議会だより第8号）
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-12",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_2.pdf",
    [
      "福祉バスの変更について",
      "都市計画道路上町大沢線について",
      "笠間芸妓組合について",
      "笠間の菊まつり期間中の道路改修について",
      "岩間駅周辺整備について",
    ]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-12",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_2.pdf",
    [
      "後期高齢者医療制度とその関連について",
      "「まちづくり特例市」の指定導入について",
      "市の委託業務、委託料について",
      "新交通システムは利用しやすい制度に",
      "エコフロンティアかさまの安全性について",
    ]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-12",
    1,
    3,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_2.pdf",
    ["地元笠間市産野菜類の消費について", "芸術の森公園の駐車場について"]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-12",
    1,
    4,
    "藤枝 浩",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_2.pdf",
    ["行財政改革について", "市道の改良工事と歩道橋の設置について"]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-12",
    1,
    5,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_2.pdf",
    ["市民活動災害補償制度について"]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-13",
    2,
    6,
    "海老澤 勝",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_3.pdf",
    [
      "笠間市総合計画の進捗状況の公表について",
      "宍戸地区の道路整備について",
      "宍戸小学校について",
    ]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-13",
    2,
    7,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_3.pdf",
    [
      "小学校通学路の十字路における横断旗の整備について",
      "ねんりんピック参加への市の負担について",
      "岩間歴史資料館の設置について",
    ]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-13",
    2,
    8,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_3.pdf",
    [
      "妊婦の健康診査に対する公費負担の充実について",
      "乳児や児童へのインフルエンザ予防接種助成について",
      "保育料の統一と多胎児家庭への支援策について",
      "児童館と子育て支援センターの設置計画について",
      "災害に強いまちづくりについて",
      "高齢化社会のとりくみについて",
    ]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-13",
    2,
    9,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_3.pdf",
    [
      "来栖本戸線について",
      "ＡＥＤの設置について",
      "妊産婦無料健診について",
      "笠間地区のゴミ収集について",
      "農業政策について",
    ]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-14",
    3,
    10,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_4.pdf",
    [
      "岩間支所庁舎の活用と支所のあり方について",
      "補助金の扱いについて",
      "指定管理者制度の導入にあたって",
    ]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-14",
    3,
    11,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_4.pdf",
    ["ごみの野外焼却について", "アスベスト管、鉛管の撤去について"]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-14",
    3,
    12,
    "須藤 勝雄",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_4.pdf",
    ["安心・安全の市立病院の継続を", "小・中学生の通学自転車の整備について"]
  ),
  fromMinutesH18(
    "h19-4-teirei",
    "平成19年第4回定例会",
    "2007-12-14",
    3,
    13,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314791060_doc_56_4.pdf",
    [
      "岩間支所利活用計画について",
      "指定管理者制度について",
      "水道料金の統一について",
    ]
  ),

  // 平成20年第1回定例会（かさま市議会だより第9号）
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-17",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_2.pdf",
    [
      "地球温暖化について",
      "新笠間市について",
      "まちづくりについて",
      "下水道について",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-17",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_2.pdf",
    [
      "後期高齢者医療制度と関連する問題について",
      "「まちづくり特例市」の指定導入について",
      "オートレース専用場外車券場設置について",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-17",
    1,
    3,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_2.pdf",
    [
      "市債について",
      "貸借対照表、いわゆるバランスシートについて",
      "水道事業の統合について",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-17",
    1,
    4,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_2.pdf",
    ["農業の活性化について", "環境問題について"]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-17",
    1,
    5,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_2.pdf",
    [
      "市の放棄地対策について",
      "耐震対策について",
      "岩間中学校にナイター設備設置を",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-18",
    2,
    6,
    "村上 典男",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_3.pdf",
    [
      "食材における国産、外国産の比率について",
      "自校給食方式とセンター方式について",
      "食育と地産地消について",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-18",
    2,
    7,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_3.pdf",
    [
      "学校給食の運営状況について",
      "茨城中央工業団地（笠間地区）整備と地域発展について",
      "入札制度と工事発注後の市の責務について",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-18",
    2,
    8,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_3.pdf",
    [
      "労働安全管理体制について",
      "全国学力・学習状況調査について",
      "放課後子どもプランと放課後児童対策事業について",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-18",
    2,
    9,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_3.pdf",
    [
      "水道料金の値下げについて",
      "食の安全と学校給食について",
      "障害者控除の申請について",
      "不要になった入れ歯の回収ボックスの設置について",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-18",
    2,
    10,
    "小薗江 一三",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_3.pdf",
    [
      "教育問題について",
      "幹線道路整備について",
      "市職員としての自覚と勤務姿勢について",
    ]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-19",
    3,
    11,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_4.pdf",
    ["学校給食の地産地消について", "防犯対策について", "財政健全化について"]
  ),
  fromMinutesH18(
    "h20-1-teirei",
    "平成20年第1回定例会",
    "2008-03-19",
    3,
    12,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314788958_doc_56_4.pdf",
    ["デマンドタクシーについて", "農業問題について", "人材育成について"]
  ),

  // 平成20年第2回定例会（かさま市議会だより第10号）
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-12",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_2.pdf",
    [
      "県道真端水戸線について",
      "友部池野辺間の市道について",
      "県道富谷稲田線について",
      "結婚相談所について",
      "農業のあり方について",
    ]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-12",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_2.pdf",
    [
      "後期高齢者医療制度について",
      "オートレース場外車券売場について",
      "エコフロンティアかさまについて",
    ]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-12",
    1,
    3,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_2.pdf",
    [
      "保育行政について",
      "学校図書の拡充と活用について",
      "水道行政について",
      "後期高齢者医療制度について",
    ]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-12",
    1,
    4,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_2.pdf",
    [
      "各小中学校の公用車の配車について",
      "行政区への未加入世帯について",
      "岩間工業団地内の道路の信号機について",
    ]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-12",
    1,
    5,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_2.pdf",
    ["市立病院について"]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-13",
    2,
    6,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_3.pdf",
    ["学校の統廃合と学区の見直しについて"]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-13",
    2,
    7,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_3.pdf",
    [
      "職員表彰規定について",
      "市発行の広報紙について",
      "地震対策について",
      "行政の究極的目的は",
    ]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-13",
    2,
    8,
    "村上 典男",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_3.pdf",
    ["イオン進出決定後の進捗状況について"]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-13",
    2,
    9,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_3.pdf",
    ["耐震化優先度調査とその補強工事について"]
  ),
  fromMinutesH18(
    "h20-2-teirei",
    "平成20年第2回定例会",
    "2008-06-13",
    2,
    10,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314788575_doc_56_3.pdf",
    ["まちづくり寄附条例について", "ＡＥＤ設置について"]
  ),

  // 平成20年第3回定例会（かさま市議会だより第11号）
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-16",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_2.pdf",
    [
      "市道福原本戸線について",
      "区長制度について",
      "山林について",
      "戦没者慰霊祭について",
    ]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-16",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_2.pdf",
    [
      "原油高騰に伴う対策について",
      "後期高齢者医療制度の問題点について",
      "廃食油の再資源化について",
      "「エコフロンティアかさま」の安全性について",
    ]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-16",
    1,
    3,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_2.pdf",
    ["指定管理者制度について", "ふるさと創生基金について"]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-16",
    1,
    4,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_2.pdf",
    [
      "戦没者追悼式について",
      "クールシュヴェール国際音楽アカデミーｉｎかさまについて",
      "郵便物のはがきの利用について",
    ]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-16",
    1,
    5,
    "小磯 節子",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_2.pdf",
    ["農業行政について"]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-17",
    2,
    6,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_3.pdf",
    ["行財政改革の実行と実績について", "教育行政の実態と実務について"]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-17",
    2,
    7,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_3.pdf",
    ["人事評価について", "ボランティア活動について"]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-17",
    2,
    8,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_3.pdf",
    ["学校給食について", "地震防災対策について", "介護保険の改善について"]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-17",
    2,
    9,
    "村上 典男",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_3.pdf",
    [
      "市内産業の景気実態について",
      "公共工事と市内産業の関係について",
      "景気低迷産業への救済について",
    ]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-18",
    3,
    10,
    "上野 登",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_4.pdf",
    ["イオン進出について", "旭町関連の排水路の整備について"]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-18",
    3,
    11,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_4.pdf",
    ["笠間市の非正規・不安定雇用対策について"]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-18",
    3,
    12,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_4.pdf",
    ["農商工連携促進法について", "笠間の菊まつりについて"]
  ),
  fromMinutesH18(
    "h20-3-teirei",
    "平成20年第3回定例会",
    "2008-09-18",
    3,
    13,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314788262_doc_56_4.pdf",
    ["デマンド交通システムについて", "職員採用について", "学校教育について"]
  ),

  // 平成20年第4回定例会（かさま市議会だより第12号）
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-11",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_2.pdf",
    [
      "朝房山について",
      "畜産試験場跡地について",
      "笠間地区荒町の水道施設について",
    ]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-11",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_2.pdf",
    [
      "経済危機に対する支援について",
      "一般廃棄物の再資源化について",
      "後期高齢者医療制度について",
      "「エコフロンティアかさま」の安全性について",
    ]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-11",
    1,
    3,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_2.pdf",
    [
      "山林の間伐について",
      "住宅地の袋小路について",
      "市職員のセクハラ対策について",
    ]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-11",
    1,
    4,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_2.pdf",
    [
      "消防防災の充実について",
      "子どもの無保険証問題について",
      "学校給食調理業務の委託について",
    ]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-12",
    2,
    5,
    "村上 典男",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_3.pdf",
    [
      "生活保護費受給世帯の最近の傾向と要因について",
      "不登校の現状とその対策について",
      "菊まつりの大菊について",
    ]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-12",
    2,
    6,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_3.pdf",
    [
      "行政改革「かさま判」を問う",
      "道路行政の実態について",
      "環境整備の推進と地域づくりについて",
    ]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-12",
    2,
    7,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_3.pdf",
    [
      "岩間地区下安居の十字路のバイパス計画について",
      "少子化、子育て支援について",
    ]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-12",
    2,
    8,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_3.pdf",
    [
      "定額給付金と緊急保証制度について",
      "水道料金について",
      "認知症サポートについて",
    ]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-15",
    3,
    9,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_4.pdf",
    ["男女共同参画について"]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-15",
    3,
    10,
    "小磯 節子",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_4.pdf",
    ["救急医療体制について", "民生委員と消防の連携について"]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-15",
    3,
    11,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_4.pdf",
    ["市営住宅駐車場について"]
  ),
  fromMinutesH18(
    "h20-4-teirei",
    "平成20年第4回定例会",
    "2008-12-15",
    3,
    12,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314786969_doc_56_4.pdf",
    ["学校図書の整備状況について", "「市立病院改革プラン」の策定状況について"]
  ),

  // 平成21年第1回定例会（かさま市議会だより第13号）
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-16",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_2.pdf",
    [
      "県道稲田友部線の道路改修及び市道来栖本戸線拡幅計画について",
      "県道杉崎友部線について",
      "水戸線笠間駅、宍戸駅間の中間駅設置について",
    ]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-16",
    1,
    2,
    "大関 久義",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_2.pdf",
    ["笠間市行政地区について", "税の納付について", "消防について"]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-16",
    1,
    3,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_2.pdf",
    [
      "笠間市の地域で頑張る企業及び市民への支援について",
      "環境資源の活用とゴミ、ゼロ廃棄物の再資源化について",
      "後期高齢者医療制度について",
      "「エコフロンティアかさま」の安全性について",
    ]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-16",
    1,
    4,
    "藤枝 浩",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_2.pdf",
    ["地域消防団の見直しについて", "市の観光と観光道路について"]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-16",
    1,
    5,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_2.pdf",
    ["介護保険制度について", "学校給食について"]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-17",
    2,
    6,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_3.pdf",
    ["県道南指原停車場線について", "畜産試験場跡地の利活用について"]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-17",
    2,
    7,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_3.pdf",
    [
      "市職員の臨時採用と住宅問題について",
      "庁舎内の盗難事故について",
      "山の命名について",
    ]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-17",
    2,
    8,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_3.pdf",
    ["市職員の給与の見直しについて", "対等合併の再確認について"]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-17",
    2,
    9,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_3.pdf",
    ["「茨城県消防広域化計画」に定める広域化の現状と笠間市の考え方について"]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-17",
    2,
    10,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_3.pdf",
    [
      "生活習慣病予防検診、人間ドック、脳ドックについて",
      "中学校における新学習指導要領について",
    ]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-18",
    3,
    11,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_4.pdf",
    [
      "デマンド交通システムについて",
      "国の２次補正予算、そして21年度予算と笠間市の予算について",
      "地方分権について",
    ]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-18",
    3,
    12,
    "村上 典男",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_4.pdf",
    [
      "人口減少の歯止めと人口定住の対策について",
      "世界不況の中、入札制度改正後の笠間市の景況感はどのようになったか",
      "道路工事現場における交通弱者の配慮について",
    ]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-18",
    3,
    13,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_4.pdf",
    [
      "小中学生の携帯電話所有・利用の実態について",
      "通学路の安全対策について",
      "文化人、芸術家の転入について",
    ]
  ),
  fromMinutesH18(
    "h21-1-teirei",
    "平成21年第1回定例会",
    "2009-03-18",
    3,
    14,
    "蛯澤 幸一",
    "https://www.city.kasama.lg.jp/data/doc/1314786003_doc_56_4.pdf",
    ["菊栽培所について", "観光マネジャーについて"]
  ),

  // 平成21年第2回定例会（かさま市議会だより第14号）
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-11",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_2.pdf",
    [
      "常磐線・友部駅南側の道路について",
      "防災無線の改良について",
      "橋爪地区の４差路について",
      "友部地区の袋小路について",
    ]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-11",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_2.pdf",
    [
      "国の2009年度補正予算の活用について",
      "笠間市の奨学金制度について",
      "デマンドタクシーについて",
      "介護保険制度について",
      "森林湖沼環境税による森林の活性化について",
    ]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-11",
    1,
    3,
    "大関 久義",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_2.pdf",
    ["消防について", "岩間中学校の改築工事について", "市内の清掃業務について"]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-11",
    1,
    4,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_2.pdf",
    ["奨学資金制度について", "小規模学校について"]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-11",
    1,
    5,
    "村上 典男",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_2.pdf",
    [
      "地域活性化臨時交付金の使途計画について",
      "畜産試験跡地の利用計画について",
      "入札条件改正について",
    ]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-12",
    2,
    6,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_3.pdf",
    ["地域活性化・経済危機対策臨時交付金について", "入札参加条件の改正について"]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-12",
    2,
    7,
    "中澤 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_3.pdf",
    ["笠間市防災計画について", "道路への木の張り出し、倒木について"]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-12",
    2,
    8,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_3.pdf",
    [
      "小学校の統合について",
      "ターゲットバードゴルフ場について",
      "中学校の運動部の実態について",
    ]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-12",
    2,
    9,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_3.pdf",
    [
      "地域活性化と安全安心なまちづくりについて",
      "国民健康保険について",
      "介護保険について",
    ]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-12",
    2,
    10,
    "小磯 節子",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_3.pdf",
    ["常磐自動車道岩間インター周辺の整備について", "岩間駅周辺整備事業について"]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-15",
    3,
    11,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_4.pdf",
    ["笠間市のＩＴ政策の現状と課題について"]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-15",
    3,
    12,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_4.pdf",
    [
      "消費生活相談・自殺者対策等について",
      "グリーンニューディールについて",
      "女性のガン検診について",
      "雇用創出事業について",
      "幼児教育無償化への取り組みについて",
    ]
  ),
  fromMinutesH18(
    "h21-2-teirei",
    "平成21年第2回定例会",
    "2009-06-15",
    3,
    13,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314785738_doc_56_4.pdf",
    [
      "学校施設における耐震・エコＩＣＴ化の推進について",
      "公共投資臨時交付金について",
    ]
  ),

  // 平成21年第3回定例会（かさま市議会だより第15号）
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-14",
    1,
    1,
    "海老澤 勝男",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_2.pdf",
    ["平成20年度の決算について", "平成20年度の税収の状況について"]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-14",
    1,
    2,
    "須藤 勝雄",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_2.pdf",
    ["畜産試験場跡地への医科大学関係機関の誘致活動について", "人材育成について"]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-14",
    1,
    3,
    "大関 久義",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_2.pdf",
    [
      "岩間地区内安戸地区の今後について",
      "北関東自動車道の笠間パーキングエリアについて",
      "市長選出馬について",
    ]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-14",
    1,
    4,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_2.pdf",
    [
      "税金滞納時の金利について",
      "今後の農業について",
      "在宅介護の講習会について",
      "血圧計の設置について",
    ]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-14",
    1,
    5,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_2.pdf",
    ["新たな笠間市づくりについて", "岩間山根地区上池の整備について"]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-15",
    2,
    6,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_3.pdf",
    [
      "合併支援道路の状況について",
      "６月議会の補正予算４億５千２百万円の進捗状況について",
      "介護保険制度の認定の見直しと医療介護費高額負担の払い戻しについて",
      "笠間地区市街地の排水路について",
      "畜産試験場跡地の活用について",
      "猪対策について",
    ]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-15",
    2,
    7,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_3.pdf",
    [
      "選挙ポスター掲示板の設置洩れと設置場所相違が発生",
      "庁舎内での事務処理の相違と事務の互換性、処理方法の統一について",
      "民主党政権誕生による市行政への影響について",
      "３年６カ月の市政執行を省みて",
    ]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-15",
    2,
    8,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_3.pdf",
    [
      "非核平和都市宣言の市民周知について",
      "笠間地域における雨水幹線の整備について",
      "「平和市長会議」への加盟について",
    ]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-15",
    2,
    9,
    "上野 登",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_3.pdf",
    [
      "畜産試験場跡地への医大誘致について",
      "新型インフルエンザ対策について",
      "高齢者人材の有効活用について",
      "茨城中央工業団地（笠間地区）について",
      "旭町の地下排水路について",
    ]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-15",
    2,
    10,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_3.pdf",
    ["「環境基本計画」の点検と進捗状況について"]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-16",
    3,
    11,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_4.pdf",
    ["インフルエンザの予防対策と感染者対策について", "保育行政について"]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-16",
    3,
    12,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_4.pdf",
    ["総合的な水路整備について"]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-16",
    3,
    13,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_4.pdf",
    ["デマンドタクシーについて", "政権交代後の自治体運営について"]
  ),
  fromMinutesH18(
    "h21-3-teirei",
    "平成21年第3回定例会",
    "2009-09-16",
    3,
    14,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314785486_doc_56_4.pdf",
    ["学校規模の適正化について", "笠間っ子育成について"]
  ),

  // 平成21年第4回定例会（かさま市議会だより第16号）
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-10",
    1,
    1,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_2.pdf",
    [
      "防火水槽の役割について",
      "笠間市大橋公民館の増築について",
      "県道真端水戸線大橋地域の計画について",
      "笠間市鴻巣ＪＲ鉄道下の道路について",
      "集中豪雨などの対策について",
    ]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-10",
    1,
    2,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_2.pdf",
    [
      "今後も予想される豪雨対策について",
      "後期高齢者医療制度について",
      "「エコフロンティアかさま」の安全性について",
      "笠間市の奨学金制度について",
    ]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-10",
    1,
    3,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_2.pdf",
    [
      "新型インフルエンザ感染対策について",
      "後期高齢者医療制度について",
      "水道基本料金の見直しについて",
      "消火活動の強化について",
    ]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-10",
    1,
    4,
    "大関 久義",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_2.pdf",
    ["小中学校の通学について", "地域活性化・経済危機対策臨時交付金について"]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-10",
    1,
    5,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_2.pdf",
    ["失業・雇用問題について", "監査委員の選任について", "企業誘致について"]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-12",
    2,
    6,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_3.pdf",
    [
      "笠間稲荷門前通り整備計画について",
      "定住化について",
      "事務事業の見直しについて",
    ]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-12",
    2,
    7,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_3.pdf",
    [
      "県道のこさ払いについて",
      "イノシシの被害対策について",
      "交通安全対策について",
    ]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-12",
    2,
    8,
    "畑岡 進",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_3.pdf",
    ["下水道事業について", "下水道施設の緊急時の対策について"]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-12",
    2,
    9,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_3.pdf",
    ["行政の無駄を省く", "深刻な介護現場について"]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-12",
    2,
    10,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_3.pdf",
    ["笠間市の雇用政策について"]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-14",
    3,
    11,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_4.pdf",
    ["入札結果について", "教育委員会の機構について"]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-14",
    3,
    12,
    "小磯 節子",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_4.pdf",
    [
      "岩間駅東土地区画整理事業について",
      "県道上吉影岩間線の堅倉街道踏切の改良工事について",
      "農業振興について",
      "耕作放棄地対策について",
    ]
  ),
  fromMinutesH18(
    "h21-4-teirei",
    "平成21年第4回定例会",
    "2009-12-14",
    3,
    13,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314785247_doc_56_4.pdf",
    ["農業政策について", "（仮称）鯉淵公園について"]
  ),

  // 平成22年第1回定例会（かさま市議会だより第17号）
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-16",
    1,
    1,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_2.pdf",
    ["公共施設の使用と使用料について", "下水道について"]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-16",
    1,
    2,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_2.pdf",
    ["地デジ難視聴対策と光ケーブルについて", "市所有の土地について"]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-16",
    1,
    3,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_2.pdf",
    [
      "平日夜間休日の一次救急の診療について",
      "就学援助について",
      "高齢者の健康診査について",
      "笠間市育英基金の存続について",
      "「エコフロンティアかさま」の操業延長計画等について",
    ]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-16",
    1,
    4,
    "大関 久義",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_2.pdf",
    [
      "笠間市の防犯について",
      "笠間市行政区について",
      "市立病院について",
      "ごみ減量化推進基金条例の一部を改正する条例について",
    ]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-16",
    1,
    5,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_2.pdf",
    ["行政改革について", "個別所得補償制度について"]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-17",
    2,
    6,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_3.pdf",
    [
      "石井地区の道路新設について",
      "市営の「介護施設」設立について",
      "東中学校近隣の悪臭について",
      "畜産試験場跡地公園について",
      "天然温泉設置について",
    ]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-17",
    2,
    7,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_3.pdf",
    ["「公契約条例」について"]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-17",
    2,
    8,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_3.pdf",
    [
      "児童館の建設について",
      "子宮頸がんワクチン接種について",
      "子どもへの医療費助成について",
      "笠間市学校給食センターの建て替えについて",
    ]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-17",
    2,
    9,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_3.pdf",
    [
      "猟区の見直しについて",
      "石岡城里線下安居十字路のバイパス計画について",
      "市税の滞納対策について",
    ]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-18",
    3,
    10,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_4.pdf",
    ["女性特有のがん検診について", "火災警報器の設置について", "介護について"]
  ),
  fromMinutesH18(
    "h22-1-teirei",
    "平成22年第1回定例会",
    "2010-03-18",
    3,
    11,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314784277_doc_56_4.pdf",
    [
      "合併の目的と支所のあり方及び参与制度の設置について",
      "地域防犯について",
      "教育行政の機構改革について",
      "畜産試験場跡地利用について",
    ]
  ),

  // 平成22年第2回定例会（かさま市議会だより第18号）
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-11",
    1,
    1,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_2.pdf",
    ["図書運動、図書館の運営について", "がん検診・予防ワクチンについて"]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-11",
    1,
    2,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_2.pdf",
    [
      "税金の納入について",
      "生活道路の改善について",
      "高齢者スポーツ活動について",
    ]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-11",
    1,
    3,
    "海老澤 勝",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_2.pdf",
    ["防災体制の現況について"]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-11",
    1,
    4,
    "大関 久義",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_2.pdf",
    [
      "笠間市の固定資産税について",
      "口蹄疫発生にかかわる笠間市の防疫対策について",
    ]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-11",
    1,
    5,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_2.pdf",
    [
      "農山間地域への支援策について",
      "笠間市の市債残高償還予定と地方交付税について",
      "市職員の臨時雇用について",
      "笠間地区市街地の排水路計画について",
    ]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-14",
    2,
    6,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_3.pdf",
    [
      "子ども手当について",
      "市から配布される文書の視覚障害者への対応について",
      "通学路の安全対策について",
      "ドクターヘリについて",
    ]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-14",
    2,
    7,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_3.pdf",
    [
      "男女共同参画推進について",
      "不登校児童生徒への対応について",
      "芸術の森公園について",
    ]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-14",
    2,
    8,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_3.pdf",
    ["「認定こども園」の現状と市の幼保一元化に対する考えについて"]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-14",
    2,
    9,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_3.pdf",
    [
      "佐白山頂上への道路整備について",
      "回覧板を回しても取らなかった書類の処理について",
      "芸術の森公園の犬の散歩について",
    ]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-14",
    2,
    10,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_3.pdf",
    [
      "区長制度の強化と市議会の責務について",
      "生活保護について",
      "岩間中学校について",
    ]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-15",
    3,
    11,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_4.pdf",
    [
      "住宅リフォーム助成制度の創設について",
      "国民健康保険の再生へ",
      "子宮頸がんワクチンの助成について",
    ]
  ),
  fromMinutesH18(
    "h22-2-teirei",
    "平成22年第2回定例会",
    "2010-06-15",
    3,
    12,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314784015_doc_56_4.pdf",
    [
      "４月28日公表の現金不正引き出しについて",
      "市立保育所の運営について",
      "人事評価と昇給、昇格について",
    ]
  ),

  // 平成22年第3回定例会（かさま市議会だより第19号）
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-14",
    1,
    1,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_2.pdf",
    ["公共建物のライフサイクルコストについて"]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-14",
    1,
    2,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_2.pdf",
    [
      "友部池野辺線、県道真端水戸線について",
      "戦没者追悼式について",
      "観光案内について",
      "来栖下郷地区の道路拡幅について",
      "結婚支援策について",
    ]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-14",
    1,
    3,
    "小磯 節子",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_2.pdf",
    ["農業施策について", "学校給食について", "耕作放棄地について"]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-14",
    1,
    4,
    "野口 圓",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_2.pdf",
    ["女性のがん対策について", "耕作放棄地対策について", "青少年育成策について"]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-14",
    1,
    5,
    "大関 久義",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_2.pdf",
    ["笠間市の農業について", "広域交流基盤を生かした新時代のまちづくりについて"]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-15",
    2,
    6,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_3.pdf",
    [
      "事後公表式入札制度の試行とまちづくりの根幹について",
      "自立と協働のまちづくりについて",
    ]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-15",
    2,
    7,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_3.pdf",
    [
      "子どもへの医療費助成制度について",
      "河川の川床の改修と蒲生用水の通年流水について",
      "「エコフロンティアかさま」の今後の監視活動について",
      "非核平和都市宣言について",
      "県住宅供給公社破産に関連して",
    ]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-15",
    2,
    8,
    "萩原 瑞子",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_3.pdf",
    ["子宮頸がん検診と予防ワクチン接種料の助成について", "市民憲章について"]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-15",
    2,
    9,
    "鈴木 裕士",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_3.pdf",
    ["人事異動について"]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-15",
    2,
    10,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_3.pdf",
    [
      "少子化対策について",
      "愛宕山道について",
      "日本ゴルフツアー選手権大会の駐車場対策について",
      "耕作放棄地対策について",
    ]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-16",
    3,
    11,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_4.pdf",
    ["ゴミの収集について"]
  ),
  fromMinutesH18(
    "h22-3-teirei",
    "平成22年第3回定例会",
    "2010-09-16",
    3,
    12,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314783742_doc_56_4.pdf",
    [
      "予防接種への助成について",
      "学校給食について",
      "生活道路の改善について",
      "障害者福祉の取り組みについて",
    ]
  ),

  // 平成22年第4回定例会（かさま市議会だより第20号）
  fromMinutesH18(
    "h22-4-teirei",
    "平成22年第4回定例会",
    "2010-11-11",
    1,
    1,
    "西山 猛",
    "https://www.city.kasama.lg.jp/data/doc/1314783470_doc_56_2.pdf",
    [
      "均衡ある新市づくりについて",
      "笠間市立学校適正規模・適正配置検討委員会の答申について",
    ]
  ),
  fromMinutesH18(
    "h22-4-teirei",
    "平成22年第4回定例会",
    "2010-11-11",
    1,
    2,
    "杉山 一秀",
    "https://www.city.kasama.lg.jp/data/doc/1314783470_doc_56_2.pdf",
    ["市民の健康体操について", "市道（笠）１２８３号線拡幅工事について"]
  ),
  fromMinutesH18(
    "h22-4-teirei",
    "平成22年第4回定例会",
    "2010-11-11",
    1,
    3,
    "横倉 きん",
    "https://www.city.kasama.lg.jp/data/doc/1314783470_doc_56_2.pdf",
    [
      "エコフロンティアかさまについて",
      "児童館の建設について",
      "介護保険について",
    ]
  ),
  fromMinutesH18(
    "h22-4-teirei",
    "平成22年第4回定例会",
    "2010-11-11",
    1,
    4,
    "町田 征久",
    "https://www.city.kasama.lg.jp/data/doc/1314783470_doc_56_2.pdf",
    ["学童保育について", "サッカー場について", "市すぐ対応課の設置について"]
  ),
  fromMinutesH18(
    "h22-4-teirei",
    "平成22年第4回定例会",
    "2010-11-11",
    1,
    5,
    "石松 俊雄",
    "https://www.city.kasama.lg.jp/data/doc/1314783470_doc_56_2.pdf",
    ["改正育児介護休業法と男性の育児休業取得促進について"]
  ),
  fromMinutesH18(
    "h22-4-teirei",
    "平成22年第4回定例会",
    "2010-11-12",
    2,
    6,
    "鈴木 貞夫",
    "https://www.city.kasama.lg.jp/data/doc/1314783470_doc_56_3.pdf",
    [
      "豊かな自然を生かした笠間の発展と耕作放棄地、山林の再生を",
      "不況対策に住宅リフォーム助成制度の創設を",
    ]
  ),
  fromMinutesH18(
    "h22-4-teirei",
    "平成22年第4回定例会",
    "2010-11-12",
    2,
    7,
    "石田 安夫",
    "https://www.city.kasama.lg.jp/data/doc/1314783470_doc_56_3.pdf",
    [
      "母子寡婦福祉会に対する一時金貸付制度について",
      "涸沼川に遡上する鮭の保護について",
    ]
  ),
];
