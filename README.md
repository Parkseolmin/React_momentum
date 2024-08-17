# Momentum

<p align="center"><img src="https://github.com/Parkseolmin/Todo-List-App-with-React/assets/76764414/e7235ae7-9ef7-444a-9ae1-12cf92e02576e" alt="Momentum이미지" width="300"/></p>
<p align="center">배포 URL : <a href="https://momentum-wine.vercel.app" target="_blank">https://momentum-wine.vercel.app/</a></p>

## 목적
Momentum은 Momentum Chrome 확장 프로그램의 기능을 React를 사용하여 재구현한 프로젝트입니다. 이 프로젝트의 목적은 사용자가 브라우저를 열 때마다 동기부여를 제공하고 생산성을 높이는 도구를 제공하는 것입니다.

## 요약
Momentum Clone은 사용자가 브라우저를 열 때마다 아름다운 배경 이미지, 영감을 주는 인용문, 할 일 목록, 현재 날씨 정보 등을 표시하여 사용자의 일상을 더욱 활기차게 만들어 줍니다.

## 목차
1. [소개](#소개)
2. [Dependencies](#Dependencies)
3. [설치 방법](#설치-방법)
4. [사용 방법](#사용-방법)

## 소개
<div align="center">
    <img src="https://github.com/Parkseolmin/React_momentum/assets/76764414/8125b23a-eab4-4c87-bfc1-81c5b215341c" alt="main 페이지" width="24%">
    <img src="https://github.com/Parkseolmin/React_momentum/assets/76764414/e2b1ecce-899b-4aab-8742-883423cc43a0" alt="todo 페이지" width="24%">
    <img src="https://github.com/Parkseolmin/React_momentum/assets/76764414/4451f16c-ba22-48ec-9ed4-53ec29e06e19" alt="pomodoro 페이지" width="24%">
    <img src="https://github.com/Parkseolmin/React_momentum/assets/76764414/48727c64-cee1-4bb7-9d66-0d21a40cce3c" alt="gpt 페이지" width="24%">
</div>


Momentum Clone은 사용자가 하루를 시작할 때마다 힘을 주는 도구입니다. 프로그램은 사용자가 브라우저를 열 때마다 아름다운 배경 이미지를 보여주고, 영감을 주는 인용문을 표시합니다. 또한 사용자는 할 일 목록을 관리하고, 현재 위치의 날씨 정보를 확인할 수 있습니다.

## Dependencies API
이 프로젝트는 다음의 API에 의존하고 있습니다:
- **Unsplash API**: 무료 고화질 이미지 제공.
- **Quotable API**: 인용구를 제공하는 API.
- **OpenWeatherMap API**: 날씨 정보를 제공하는 API.

## Dependencies
이 프로젝트는 다음의 라이브러리 및 패키지에 의존하고 있습니다:
- **React**: 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리.
- **Axios**: HTTP 요청을 쉽게 처리하기 위한 Promise 기반의 라이브러리.
- **Ant Design (antd)**: 다양한 UI 컴포넌트를 제공하는 React UI 라이브러리.
- **React Router DOM**: SPA에서 페이지 간 내비게이션을 관리하는 라이브러리.
- **Styled Components**: CSS-in-JS 라이브러리로, 컴포넌트 기반 스타일링을 가능하게 함.
- **React Query**: 서버 상태 관리를 위한 라이브러리.
- **React Testing Library**: React 컴포넌트를 테스트하는 데 유용한 도구.
- **UUID**: 고유 식별자를 생성하기 위한 라이브러리.
- **React Circular Progressbar**: 원형 진행 바 컴포넌트를 제공하는 라이브러리.
- **Web Vitals**: 웹 성능 측정을 위한 라이브러리.
- **React Helmet Async**: 메타 태그 관리를 위한 라이브러리.
- **React Slider**: 슬라이더 UI 컴포넌트를 제공하는 라이브러리.
- **Kadvice**: 특정 기능(예: 조언 제공)을 위한 라이브러리.

## 설치 방법
1. GitHub 저장소를 클론합니다.
    ```bash
    git clone https://github.com/Parkseolmin/React_Momentum.git
    cd React_Momentum
    ```
2. `npm install` 명령어를 사용하여 의존성을 설치합니다.
    ```bash
    npm install
    ```
3. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, API 키를 설정합니다.
    ```
    REACT_APP_UNSPLASH_API=your_unsplash_api_key
    REACT_APP_WEATHER_API=your_openweathermap_api_key
    REACT_APP_GPT_KEY=your_openweathermap_api_key
    ```

## 사용 방법

1. 프로젝트를 로컬 환경에서 실행합니다.
    ```bash
    npm start
    ```
2. Momentum 화면이 로드되면, 사용자는 감성적인 배경 이미지를 볼 수 있습니다. 배경 이미지는 5시간을 기준으로 변경됩니다.
   
3. 인용문은 클릭시 변경됩니다.
   
4. 사용자는 현재 위치의 날씨 정보를 확인할 수 있으며, 클릭시 정보가 갱신됩니다.
   
5. Pomodoro 타이머는 settings버튼을 통해 작업시간과 휴식시간을 정할 수 있습니다.
   
6. 사용자는 할 일 목록을 추가하고 관리할 수 있습니다.
    
7. GPT API를 이용해 할 일 목록에 작성한 내용을 기반으로 평가 및 조언을 작성해줍니다.
 - 첫 번째 버튼 - 할 일 목록에 작성한 내용을 기반
 - 두 번째 버튼 - TextArea에 작성한 내용을 기반
