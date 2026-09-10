import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/main.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  testWidgets('QuizifyApp builds successfully smoke test', (WidgetTester tester) async {
    SharedPreferences.setMockInitialValues({});

    await tester.pumpWidget(const QuizifyApp());
    expect(find.byType(QuizifyApp), findsOneWidget);

    // Flush background update check timer
    await tester.pump(const Duration(seconds: 3));
  });
}
