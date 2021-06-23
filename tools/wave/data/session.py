from ..testing.test_loader import MANUAL, AUTOMATIC

PAUSED = "paused"
RUNNING = "running"
COMPLETED = "completed"
ABORTED = "aborted"
PENDING = "pending"
UNKNOWN = "unknown"


class Session:
    def __init__(
            self,
            token=None,
            types=None,
            user_agent=None,
            labels=None,
            tests=None,
            pending_tests=None,
            running_tests=None,
            timeouts=None,
            status=None,
            test_state=None,
            last_completed_test=None,
            recent_completed_count=None,
            date_started=None,
            date_finished=None,
            is_public=None,
            reference_tokens=None,
            browser=None,
            webhook_urls=None,
            expiration_date=None,
            malfunctioning_tests=None
    ):
        if token is None:
            token = ""
        self.token = token
        if types is None:
            types = [AUTOMATIC, MANUAL]
        self.types = types
        if user_agent is None:
            user_agent = ""
        self.user_agent = user_agent
        if labels is None:
            labels = []
        self.labels = labels
        if tests is None:
            tests = {}
        self.tests = tests
        if pending_tests is None:
            pending_tests = {}
        self.pending_tests = pending_tests
        if running_tests is None:
            running_tests = {}
        self.running_tests = running_tests
        if timeouts is None:
            timeouts = {}
        self.timeouts = timeouts
        if status is None:
            status = UNKNOWN
        self.status = status
        if test_state is None:
            test_state = {}
        self.test_state = test_state
        self.last_completed_test = last_completed_test
        if recent_completed_count is None:
            recent_completed_count = 0
        self.recent_completed_count = recent_completed_count
        self.date_started = date_started
        self.date_finished = date_finished
        if is_public is None:
            is_public = False
        self.is_public = is_public
        if reference_tokens is None:
            reference_tokens = []
        self.reference_tokens = reference_tokens
        self.browser = browser
        if webhook_urls is None:
            webhook_urls = []
        self.webhook_urls = webhook_urls
        self.expiration_date = expiration_date
        if malfunctioning_tests is None:
            malfunctioning_tests = []
        self.malfunctioning_tests = malfunctioning_tests
