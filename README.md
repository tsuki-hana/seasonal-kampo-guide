# 季節病と漢方薬ガイド
日本の季節に応じた病気と、それに効果的な漢方薬を紹介するWebサービスです。
## 主な機能
- **12か月カレンダー表示**: 月を選択して季節病を確認
- **月別病気一覧**: その月に多い病気の詳細情報
- **漢方薬推奨**: 各病気に効果的な漢方薬の紹介
- **詳細情報**: 効果・効能、注意点、適用タイプの説明
- **レスポンシブデザイン**: スマートフォン・タブレット対応
## 技術構成
### バックエンド
- **Python 3.11**
- **Flask** - Webフレームワーク
- **Gunicorn** - WSGIサーバー
### フロントエンド
- **HTML5** - マークアップ
- **Bootstrap 5** - レスポンシブCSSフレームワーク
- **JavaScript** - インタラクティブ機能
- **Feather Icons** - アイコンライブラリ
### データ
- **JSON** - 病気・漢方薬データの管理（525行の完全なデータベース）
## セットアップ方法
### 必要な環境
- Python 3.11以上
- pip（Pythonパッケージマネージャー）
### インストール手順
1. **リポジトリのクローン**
```bash
git clone https://github.com/tsuki-hana/seasonal-kampo-guide.git
cd seasonal-kampo-guide
依存関係のインストール
pip install flask flask-sqlalchemy gunicorn psycopg2-binary email-validator
アプリケーションの起動
python main.py
ブラウザでアクセス
http://localhost:5000
プロジェクト構造
/
├── data/
│   └── disease_data.json      # 月ごとの病気と漢方薬データ
├── static/
│   ├── css/
│   │   └── style.css          # カスタムスタイル
│   └── js/
│       └── script.js          # JavaScript機能
├── templates/
│   ├── base.html              # ベーステンプレート
│   ├── index.html             # ホームページ
│   ├── month.html             # 月別ページ
│   └── disease.html           # 病気詳細ページ
├── app.py                     # Flaskアプリケーション設定
├── main.py                    # アプリケーションエントリーポイント
├── routes.py                  # ルーティング定義
└── pyproject.toml             # Python依存関係
今後の機能予定
クイズ・診断ゲーム形式
ユーザー入力による漢方レコメンド
体質診断機能
症状別検索機能
お気に入り保存機能
多言語対応
重要な注意事項
このサービスは情報提供を目的としており、医療診断や治療の代替ではありません。
漢方薬の使用前は必ず医師、薬剤師、または漢方専門家にご相談ください。

ライセンス
このプロジェクトはMITライセンスの下で公開されています。

注意: このシステムは教育・情報提供目的で作成されています。実際の医療判断は専門医にご相談ください。
