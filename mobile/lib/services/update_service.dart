import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';

class AppUpdateInfo {
  final bool hasUpdate;
  final String currentVersion;
  final String latestVersion;
  final String releaseTitle;
  final String releaseNotes;
  final String downloadUrl;

  const AppUpdateInfo({
    required this.hasUpdate,
    required this.currentVersion,
    required this.latestVersion,
    required this.releaseTitle,
    required this.releaseNotes,
    required this.downloadUrl,
  });
}

class UpdateService {
  static final UpdateService _instance = UpdateService._internal();
  factory UpdateService() => _instance;
  UpdateService._internal();

  static const String _githubRepo = "MishrajiiCode/Quzify";

  Future<AppUpdateInfo?> checkForUpdate() async {
    try {
      String currentVersion = "1.0.0";
      try {
        final packageInfo = await PackageInfo.fromPlatform();
        currentVersion = packageInfo.version;
      } catch (_) {}

      final url = Uri.parse("https://api.github.com/repos/$_githubRepo/releases/latest");
      final response = await http.get(
        url,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      ).timeout(const Duration(seconds: 8));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final String tagName = (data['tag_name'] ?? '').toString().replaceAll('v', '').trim();
        final String releaseTitle = data['name'] ?? 'New Quizify Version';
        final String releaseNotes = data['body'] ?? 'Performance improvements and new questions.';

        // Find APK download URL from assets
        String downloadUrl = data['html_url'] ?? "https://github.com/$_githubRepo/releases";
        final assets = data['assets'] as List<dynamic>?;
        if (assets != null && assets.isNotEmpty) {
          for (final asset in assets) {
            final name = (asset['name'] ?? '').toString().toLowerCase();
            if (name.endsWith('.apk')) {
              downloadUrl = asset['browser_download_url'] ?? downloadUrl;
              break;
            }
          }
        }

        final bool isNewer = _isVersionNewer(currentVersion, tagName);

        return AppUpdateInfo(
          hasUpdate: isNewer,
          currentVersion: currentVersion,
          latestVersion: tagName.isNotEmpty ? tagName : currentVersion,
          releaseTitle: releaseTitle,
          releaseNotes: releaseNotes,
          downloadUrl: downloadUrl,
        );
      }
    } catch (e) {
      debugPrint("UpdateService check failed: $e");
    }
    return null;
  }

  bool _isVersionNewer(String current, String remote) {
    if (remote.isEmpty) return false;
    try {
      final currentParts = current.split('.').map((e) => int.tryParse(e) ?? 0).toList();
      final remoteParts = remote.split('.').map((e) => int.tryParse(e) ?? 0).toList();

      for (int i = 0; i < 3; i++) {
        final c = i < currentParts.length ? currentParts[i] : 0;
        final r = i < remoteParts.length ? remoteParts[i] : 0;
        if (r > c) return true;
        if (r < c) return false;
      }
    } catch (_) {}
    return false;
  }
}
