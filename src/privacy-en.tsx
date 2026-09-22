import { BASE } from "./site-config";

export function EnglishPrivacy() {
  return (
    <section id="privacy-en" className="policy-language-section" lang="en" aria-labelledby="privacy-en-title">
      <h1 id="privacy-en-title">Privacy Policy</h1>
      <p className="date">Effective date and last updated: September 22, 2026</p>
      <p>
        northface (the “Operator”) processes information for ToePick (shown in
        the app as TOE-PICK; Android package: com.toepick) as described below.
        This policy covers the ToePick mobile app and this introductory website.
      </p>
      <div className="summary">
        <strong>At a glance</strong>
        <p>
          ToePick does not require an account. To keep your learning progress,
          however, it stores a randomly generated device-specific service
          identifier and practice records on its server. Not asking for your
          name or email to sign up does not mean that no data is collected.
        </p>
        <p>
          The server does not currently have a scheduled automatic deletion
          process or a fixed retention period for practice records. Deleting
          the app does not automatically delete records already on the server.
        </p>
      </div>

      <h2>1. Information processed and why</h2>
      <ul>
        <li>
          <strong>Device-specific service identifiers:</strong> The server
          issues a random identifier for an app installation and stores a hash
          of its authentication token. These are used to identify the owner of
          practice records and prevent access by other users. Advertising IDs,
          IMEI numbers, and phone numbers are not used as ToePick service IDs.
        </li>
        <li>
          <strong>Advertising information:</strong> The mobile app uses the
          Google Mobile Ads SDK. Google may process an IP address, app and
          device information, ad interactions, and device advertising
          identifiers to deliver ads, limit frequency, prevent fraud, and
          measure performance. If you decline iOS tracking permission or do
          not allow personalized ads where a choice is offered, ads may still
          appear without IDFA-based tracking. Your access to practice results
          is not restricted by those choices.
        </li>
        <li>
          <strong>Learning records:</strong> Set identifiers, generation time
          and status, generated questions, selected answers, correctness,
          device-local practice dates, time spent per question, retry links,
          and request-deduplication identifiers are stored to grade answers,
          resume sessions, show history and statistics, and enable review.
        </li>
        <li>
          <strong>Information stored on your device:</strong> The
          authentication token is stored in the operating system&apos;s secure
          storage. Result caches, bookmarks, saved vocabulary, nickname,
          avatar, appearance mode, local notification settings, and app state
          are stored locally for history access and offline review.
        </li>
        <li>
          <strong>Support inquiries:</strong> If you email us, your email
          address and message are used to answer and handle your request.
          Please do not send authentication tokens or passwords by email.
        </li>
      </ul>
      <p>
        The app does not currently require a name or email to create an account
        and does not provide features that collect precise location, contacts,
        photos, or microphone recordings. Sentry, PostHog, and LogRocket
        analytics or session-replay SDKs are not currently integrated.
      </p>

      <h2>2. AI and third-party services</h2>
      <p>
        <strong>Google Mobile Ads:</strong> When you complete a new LC or RC
        practice session and move to its results, the app attempts to display
        an interstitial ad at most once for that session. At app start, Google
        User Messaging Platform (UMP) checks the consent status applicable to
        your region and presents a choice form when required. On iOS, Apple
        App Tracking Transparency (ATT) permission is requested if IDFA-based
        tracking is to be used. If an ad is unavailable or consent limits ad
        requests, you go straight to the results. See the{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>
        {" "}and{" "}
        <a href="https://support.google.com/My-Ad-Center-Help/answer/12155764" target="_blank" rel="noreferrer">Google&apos;s ad privacy information</a>.
      </p>
      <p>
        <strong>Vercel and Supabase:</strong> The app API runs on Vercel.
        Device-specific identifiers, authentication-token hashes, questions,
        answers, and learning records are stored in Supabase PostgreSQL.
        Generated listening MP3 files are kept in private Supabase Storage.
        The app accesses its own records through the server, not directly
        through the database. Hosting providers may process technical request
        information such as IP addresses and access times for delivery and
        security. See the{" "}
        <a href="https://vercel.com/legal/privacy-policy">Vercel Privacy Policy</a>
        {" "}and{" "}
        <a href="https://supabase.com/privacy">Supabase Privacy Policy</a>.
      </p>
      <p>
        <strong>Google Gemini:</strong> The server calls the Gemini API to
        create English questions and Korean explanations. Requests include
        question types, topics, generation instructions, previously generated
        sentences used to prevent duplication, and validation error details.
        The current implementation does not send your device authentication
        token, device-specific service identifier, selected answers, or
        learning history in generation requests. See the{" "}
        <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noreferrer">Gemini API Terms</a>.
      </p>
      <p>
        <strong>LangSmith:</strong> Inputs and outputs of the question
        generation process, execution times, and errors are used for quality
        and issue analysis. Device authentication tokens and user answers are
        not sent to the generation graph. See the{" "}
        <a href="https://www.langchain.com/privacy-policy" target="_blank" rel="noreferrer">LangChain Privacy Policy</a>.
      </p>
      <p>
        <strong>Speechify and Cartesia:</strong> The server sends generated
        English questions and answer options to voice providers to create
        listening audio. New audio is generated with Speechify, while earlier
        Cartesia audio remains available. User answers and device
        authentication tokens are not included in voice-generation requests.
      </p>
      <p>
        <strong>Introductory website:</strong> This website is served through
        GitHub Pages. Its hosting provider may process technical access
        information such as IP addresses for delivery and security. The site
        has no account-registration form, ads, or separate visitor analytics.
        See the{" "}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">GitHub Privacy Statement</a>.
      </p>
      <p>
        Depending on the service, these providers may process information
        outside South Korea. We will update this policy if a change to the
        hosting, storage, or analytics actually used changes how user
        information is processed.
      </p>

      <h2>3. Retention and deletion</h2>
      <p>
        <strong>Advertising information:</strong> Google processes and retains
        advertising information according to its policies and your choices.
        To avoid trying to show the same ad again for a session, the app stores
        only whether an ad was attempted for that session in on-device SQLite.
        You can remove that local record by clearing the app&apos;s data or
        uninstalling it.
      </p>
      <p>
        <strong>Server-side identifiers and learning records:</strong> These
        support history and session resumption. There is currently no
        scheduled automatic deletion or fixed retention period. Records may
        remain on the server until they are separately deleted.
      </p>
      <p>
        <strong>On-device cache and bookmarks:</strong> You can remove these
        by clearing app data or uninstalling the app. Authentication
        information in secure storage may persist depending on your operating
        system and backup settings. Uninstalling does not delete server data.
      </p>
      <p>
        <strong>Support emails:</strong> They are used to answer and handle
        requests. There is currently no scheduled deletion period for inquiry
        emails. You may request their deletion using the contact below.
      </p>
      <p>
        The app currently has no in-app button or API for deleting all server
        records. To request access, correction, deletion, or restriction of
        server-side records, email{" "}
        <a href="mailto:support@minlabs.app?subject=ToePick%20Privacy%20Request">support@minlabs.app</a>.
        We will explain how to identify the records and verify ownership.
        Because this service uses an anonymous device identifier, losing that
        identifier—for example after uninstalling the app—may limit our
        ability to locate records or verify ownership.
      </p>

      <h2>4. Security</h2>
      <p>
        The raw authentication token is not stored in the server database; a
        hash is used to verify it. The server checks record ownership on
        requests, and the device keeps the token in operating-system secure
        storage. Access to information is limited to what is needed to run
        the service.
      </p>

      <h2>5. Your choices and rights</h2>
      <p>
        You can email us to ask about access, correction, deletion,
        restriction of processing, or other privacy matters. Please include
        only the minimum information needed to explain your request. Because
        the app has no registered account, there is no account-closure flow;
        requests concern the stored learning records instead.
      </p>
      <p>
        Where a region requires re-entry to advertising privacy choices, you
        can review or change them through “Open privacy options” in the app&apos;s
        My Page. On iOS, tracking permission can also be changed in device
        settings.
      </p>

      <h2>6. Operator and contact</h2>
      <p>
        Operator: <strong>northface</strong><br />
        Service: <strong>TOE-PICK</strong><br />
        Privacy inquiries: <a href="mailto:support@minlabs.app">support@minlabs.app</a>
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        Changes to collected information, purposes, service providers, or
        retention and deletion practices will be reflected on this page with
        an updated effective date. Where applicable law requires separate
        notice or consent, we will follow that process.
      </p>
      <p><a href={BASE}>← Back to ToePick</a></p>
    </section>
  );
}
